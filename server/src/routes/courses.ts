import { Response, Router } from "express";
import Course, {
  ICourse,
  PROPOSAL_STATUS,
  COURSE_STATUS,
} from "../models/Course";
import { IGetUserAuthInfoRequest, authCheck } from "../middleware/auth";
import User, { ROLES, IUser } from "../models/User";
import {
  sendAcceptEmail,
  sendRejectEmail,
  sendRevisionEmail,
  sendWithdrawalEmail,
  sendDeleteEmail,
} from "../config/mailer";

const courseRouter = Router();

function search(search_term) {
  return Course.find(search_term).populate("professors");
}

function strToBool(str: string): boolean {
  const test = str.trim().toLowerCase();
  return !(test === "false" || test === "0" || test === "");
}

// search courses
courseRouter.get(
  "/search/:finalized",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const search_term = req.query;
    let finalized_term = {};

    if (
      !search_term.proposal_status &&
      typeof req.params.finalized !== "undefined"
    ) {
      // if finalized exists (has been set)
      if (strToBool(req.params.finalized)) {
        // if finalized is true
        finalized_term = { proposal_status: PROPOSAL_STATUS.CCC_ACCEPTED };
      } else {
        // want proposed courses
        finalized_term = {
          proposal_status: { $ne: PROPOSAL_STATUS.CCC_ACCEPTED },
        };
      }
    }

    try {
      const result = await search({ ...search_term, ...finalized_term });
      res.status(200).json({ result });
    } catch (err) {
      res.status(400).json({
        message:
          "at least one of the fields in the search term has the wrong type; see ICourse in models/Courses.ts for correct types",
      });
    }
  }
);

function getCourseStatus(proposed_course, original_course) {
  if (!original_course) {
    return COURSE_STATUS.NEW;
  }
  if (
    original_course.course_title === proposed_course.course_title &&
    original_course.description === proposed_course.description &&
    original_course.is_RPP === proposed_course.is_RPP &&
    original_course.is_remote_accessible ===
      proposed_course.is_remote_accessible &&
    original_course.is_remote_only === proposed_course.is_remote_only &&
    original_course.is_WRIT === proposed_course.is_WRIT
  ) {
    return COURSE_STATUS.EXISTING;
  } else {
    return COURSE_STATUS.REVISED;
  }
}

interface ICourseProposalRequest {
  original?: ICourse;
  proposed: ICourse;
}

// submit a course
courseRouter.post(
  "/submit",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const proposalRequest = req.body as ICourseProposalRequest;
    const status = getCourseStatus(
      proposalRequest.proposed,
      proposalRequest.original
    );

    if ((await Course.find(proposalRequest.proposed)).length > 0) {
      // duplicate course
      res.status(400).json({
        message: "cannot submit a duplicate course",
      });
      return;
    }

    if (req.user.role !== ROLES.DEFAULT) {
      const newCourse = await Course.create({
        ...proposalRequest.proposed,
        proposal_status: PROPOSAL_STATUS.DIRECTOR_REVIEW,
        course_status: status,
        rejected: false,
        withdrawn: false,
      });
      console.log(97);
      res.status(200).json({ newCourse });
    } else {
      res.status(400).json({
        message: "submission failed",
      });
    }
  }
);

// edit a course
courseRouter.post(
  "/edit",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    var course = req.body as ICourse;

    if (req.user.role === ROLES.DEFAULT) {
      res.status(403).json({
        message: "Default users cannot edit",
      });
      return;
    } else if (
      req.user.role === ROLES.PROFESSOR ||
      req.user.role === ROLES.GRAD_DIRECTOR ||
      req.user.role === ROLES.UG_DIRECTOR
    ) {
      // if you don't own the course
      if (!course.professors.includes((req.user._id as any).valueOf())) {
        res.status(403).json({
          message: "Do not have permission to edit another professor's course",
        });
        return;
      }

      if (course.proposal_status === PROPOSAL_STATUS.CCC_ACCEPTED) {
        res.status(403).json({
          message:
            "Only the manager or curriculum coordinator can edit a course that has been accepted by CCC",
        });
        return;
      }

      if (
        req.user.role === ROLES.PROFESSOR &&
        course.proposal_status === PROPOSAL_STATUS.DIRECTOR_ACCEPTED
      ) {
        res.status(403).json({
          message:
            "Professors cannot edit a course that has been accepted by director",
        });
        return;
      }
    }

    var recipient_roles = [];
    var profIds = [];

    if (req.user.role === ROLES.PROFESSOR) {
      // email only if prof is editing a rejected course
      if (course.proposal_status !== PROPOSAL_STATUS.DIRECTOR_REVIEW) {
        // email co-professors, if they exist
        profIds = course.professors.filter(function (prof) {
          return prof !== req.user._id.toString();
        });
        // email relevant directors
        if (course.levels.length == 2) {
          recipient_roles.push(ROLES.UG_DIRECTOR, ROLES.GRAD_DIRECTOR);
        } else if (course.levels[0] === "Undergraduate") {
          recipient_roles.push(ROLES.UG_DIRECTOR);
        } else {
          recipient_roles.push(ROLES.GRAD_DIRECTOR);
        }

        if (course.proposal_status === PROPOSAL_STATUS.CCC_REJECTED) {
          recipient_roles.push(ROLES.MANAGER);
        }
      }
    } else {
      // email professors / co-professors
      profIds = course.professors.filter(function (prof) {
        return prof !== req.user._id.toString();
      });
    }

    // managers and curriculum coordinators can always edit without going through approval process again
    // directors already can't edit other profs' courses, so this just prevents them from having to reapprove their own course if they edit

    if (req.user.role === ROLES.PROFESSOR) {
      course.proposal_status = PROPOSAL_STATUS.DIRECTOR_REVIEW;
    }

    //if you want to add a field to all the data in the collection, just uncomment the following and modify with desired parameters.
    //Also update the ICourse interface and Course schema accordingly. Then edit a course on the site to modify all documents.

    await Course.updateMany(
      {},
      { $set: { withdrawn: false, rejected: false, manager_comments: "" } }
    );

    await Course.updateMany(
      { proposal_status: "under review by director" },
      { $set: { withdrawn: false, rejected: true, manager_comments: "" } }
    );

    try {
      await Course.updateOne({ _id: course._id }, course);

      var to = [];
      for (const recipient_role of recipient_roles) {
        let matches = await User.find(
          { role: recipient_role },
          { email: true }
        );
        matches.forEach((match) => to.push(match.email));
      }

      for (const profId of profIds) {
        let match = await User.findOne({ _id: profId }, { email: true });
        if (match !== null) {
          to.push(match.email);
        }
      }

      // console.log("sending to");
      // console.log(to);

      // if (to.length > 0) {
      //   sendRevisionEmail(to, course, req.user.displayName);
      // }

      res.status(200).json({
        message: "editing course succeeded",
      });
    } catch (err) {
      res.status(400).json({
        message: "editing course failed",
      });
    }
  }
);

// withdraw a course
courseRouter.post(
  "/withdraw",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    var course = req.body as ICourse;

    if (req.user.role === ROLES.DEFAULT) {
      res.status(403).json({
        message: "Default users cannot withdraw",
      });
      return;
    } else if (
      req.user.role === ROLES.PROFESSOR ||
      req.user.role === ROLES.GRAD_DIRECTOR ||
      req.user.role === ROLES.UG_DIRECTOR
    ) {
      // if you don't own the course
      if (!course.professors.includes((req.user._id as any).valueOf())) {
        res.status(403).json({
          message:
            "Do not have permission to withdraw another professor's course",
        });
        return;
      }

      if (course.proposal_status === PROPOSAL_STATUS.CCC_ACCEPTED) {
        res.status(403).json({
          message:
            "Only the manager or curriculum coordinator can withdraw a course that has been accepted by CCC",
        });
        return;
      }

      if (
        req.user.role === ROLES.PROFESSOR &&
        course.proposal_status === PROPOSAL_STATUS.DIRECTOR_ACCEPTED
      ) {
        res.status(403).json({
          message:
            "Professors cannot withdraw a course that has been accepted by director",
        });
        return;
      }
    }

    var recipient_roles = [];

    recipient_roles.push(ROLES.MANAGER);

    try {
      await Course.updateOne({ _id: course._id }, course);
      var to = [];
      for (const recipient_role of recipient_roles) {
        let matches = await User.find(
          { role: recipient_role },
          { email: true }
        );
        matches.forEach((match) => to.push(match.email));
      }

      if (to.length > 0) {
        sendWithdrawalEmail(to, course, req.user.displayName);
      }

      res.status(200).json({
        message: "withdrawing course succeeded",
      });
    } catch (err) {
      res.status(400).json({
        message: "withdrawing course failed",
      });
    }
  }
);

// delete a course
courseRouter.post(
  "/delete",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    var course = req.body as ICourse;

    if (req.user.role === ROLES.DEFAULT) {
      res.status(403).json({
        message: "Default users cannot delete",
      });
      return;
    } else if (
      req.user.role === ROLES.PROFESSOR ||
      req.user.role === ROLES.GRAD_DIRECTOR ||
      req.user.role === ROLES.UG_DIRECTOR
    ) {
      // if you don't own the course
      if (!course.professors.includes((req.user._id as any).valueOf())) {
        res.status(403).json({
          message:
            "Do not have permission to delete another professor's course",
        });
        return;
      }

      if (course.proposal_status === PROPOSAL_STATUS.CCC_ACCEPTED) {
        res.status(403).json({
          message:
            "Only the manager or curriculum coordinator can delete a course that has been accepted by CCC",
        });
        return;
      }

      if (
        req.user.role === ROLES.PROFESSOR &&
        course.proposal_status === PROPOSAL_STATUS.DIRECTOR_ACCEPTED
      ) {
        res.status(403).json({
          message:
            "Professors cannot withdraw a course that has been accepted by director",
        });
        return;
      }
    }

    var recipient_roles = [];

    recipient_roles.push(ROLES.MANAGER);

    try {
      await Course.remove({ _id: course._id });
      var to = [];
      for (const recipient_role of recipient_roles) {
        let matches = await User.find(
          { role: recipient_role },
          { email: true }
        );
        matches.forEach((match) => to.push(match.email));
      }

      if (to.length > 0) {
        sendDeleteEmail(to, course, req.user.displayName);
      }

      res.status(200).json({
        message: "deleting course succeeded",
      });
    } catch (err) {
      res.status(400).json({
        message: "deleting course failed",
      });
    }
  }
);

courseRouter.post(
  "/accept-reject/:is_accept",
  authCheck,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const isAccept =
      typeof req.params.is_accept !== "undefined" &&
      strToBool(req.params.is_accept);

    const { course, reason, managerReason } = req.body as {
      course: ICourse;
      reason: string;
      managerReason: string;
    };
    var new_status = "";
    var new_reject_status = false;

    if (
      req.user.role === ROLES.MANAGER ||
      req.user.role === ROLES.GRAD_DIRECTOR ||
      req.user.role === ROLES.UG_DIRECTOR
    ) {
      if (
        req.user.role === ROLES.UG_DIRECTOR ||
        req.user.role === ROLES.GRAD_DIRECTOR
      ) {
        if (isAccept) {
          new_status = PROPOSAL_STATUS.DIRECTOR_ACCEPTED;
        } else {
          new_reject_status = true;
          if (
            course.proposal_status === PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED
          ) {
            new_status = PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED;
          } else if (course.proposal_status === PROPOSAL_STATUS.CCC_REJECTED) {
            new_status = PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED;
          } else {
            new_status = PROPOSAL_STATUS.DIRECTOR_REJECTED;
          }
        }
      } else if (req.user.role === ROLES.MANAGER) {
        if (isAccept) {
          new_status = PROPOSAL_STATUS.CCC_ACCEPTED;
        } else {
          new_reject_status = true;
          if (
            course.proposal_status === PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED
          ) {
            new_status = PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED;
          } else if (
            course.proposal_status === PROPOSAL_STATUS.DIRECTOR_REJECTED
          ) {
            new_status = PROPOSAL_STATUS.DIRECTOR_CCC_REJECTED;
          } else {
            new_status = PROPOSAL_STATUS.CCC_REJECTED;
          }
        }
      }
    } else {
      res.status(403).json({
        message: "do not have permission to accept/reject courses",
      });
    }

    try {
      await Course.updateOne(
        { _id: course._id },
        {
          $set: {
            proposal_status: new_status,
            comments: reason,
            manager_comments: managerReason,
            rejected: new_reject_status,
          },
        }
      );

      var profEmails = [];
      for (const profId of course.professors) {
        let match = await User.findOne({ _id: profId }, { email: true });
        if (match !== null) {
          profEmails.push(match.email);
        }
      }

      if (isAccept) {
        sendAcceptEmail(
          profEmails,
          course,
          reason,
          managerReason,
          req.user.role !== ROLES.MANAGER
        );
      } else {
        sendRejectEmail(
          profEmails,
          course,
          reason,
          managerReason,
          req.user.role !== ROLES.MANAGER
        );
      }

      res.status(200).json({
        message: "accepting/rejected course succeeded",
      });
    } catch (err) {
      res.status(400).json({
        message: "accepting/rejecting course failed",
      });
    }
  }
);

export default courseRouter;
