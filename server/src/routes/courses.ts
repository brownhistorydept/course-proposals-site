import { Request, Response, Router } from "express";
import Course, { ICourse, PROPOSAL_STATUS, COURSE_STATUS } from "../models/Course"
import { IGetUserAuthInfoRequest } from "../middleware/auth";
import { getPermissions, ROLES } from "../models/Permissions";

const courseRouter = Router();

function search(search_term) {
    return Course.find(search_term).populate('professors');;
}

// this function is janky - should use a legit library
function strToBool(str: string): boolean {
    const test = str.trim().toLowerCase();
    return !((test === 'false') || (test === '0') || (test === ''));
}

// search courses
courseRouter.get("/search/:finalized", async (req: IGetUserAuthInfoRequest, res: Response) => {
    // if frontend wants to get only current courses, they have to pass back year in search term
    if (typeof req.params.finalized === 'undefined') {
        res.status(401).json({
            message: "specify whether you want finalized courses or all courses",
        });
    }
    let status_term;
    if (strToBool(req.params.finalized)) { 
        status_term = {proposal_status: PROPOSAL_STATUS.CCC_ACCEPTED};
    } else { // want proposed courses
        const permissions = getPermissions(req.user.role);
        if (permissions.can_review_undergrad_courses && permissions.can_review_graduate_courses) { // manager
            status_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}};
        } else if (permissions.can_review_undergrad_courses) { // undergraduate reviewer or director
            status_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}, is_undergrad: true};
        } else if (permissions.can_review_graduate_courses) { // graduate director
            status_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}, is_undergrad: false};
        } else if (req.user.role == ROLES.PROFESSOR) { // give them their proposed courses only
            status_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}, professor: req.user._id}
        }
    }

    // NEED TO DEAL WITH PARSING SEARCH PARAMS (perhaps express middleware)
    const search_term = req.query;
    try {
        // status_term must come after search_term to make sure that if proposed_status is in search term, the updated value in status_term overwrites it
        const result = await search({ ...search_term, ...status_term}); 
        res.status(200).json({result});
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "no course found with this search term",
        });
    }
    
});

function getCourseStatus(proposed_course, original_course) {
    if (!original_course) {
        return COURSE_STATUS.NEW;
    }
    if (original_course.course_title === proposed_course.course_title && 
        original_course.description === proposed_course.description &&  
        original_course.is_DIAP === proposed_course.is_DIAP &&  
        original_course.is_remote === proposed_course.is_remote &&  
        original_course.is_WRIT === proposed_course.is_WRIT) {
        return COURSE_STATUS.EXISTING;
    } else {
        return COURSE_STATUS.REVISED;
    }
};

interface ICourseProposalRequest {
    original?: ICourse, // this is the course upon which the proposed course is based. Should pass back the full ICourse Object, including the populated professor IUser objects
    proposed: ICourse, // this will have professors as an array of strings, where each string is the professor's Object ID
}

// submit a course
courseRouter.post("/submit", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const permissions = getPermissions(req.user.role);
    const proposalRequest = req.body as ICourseProposalRequest;
    const status = getCourseStatus(proposalRequest.proposed, proposalRequest.original);

    if (permissions.can_submit_courses) {
        const newCourse = await Course.create({
            ...proposalRequest.proposed, 
            proposal_status: PROPOSAL_STATUS.DIRECTOR_REVIEW, 
            course_status: status
        });
        res.status(200).json({newCourse});

        // TODO: notify relevant parties via email
    } else {
        res.status(401).json({
            message: "submission failed",
        });
    }
});

// edit a course
// course_id should be the _id of the course as a string, and the field to change should be passed back in req.query
courseRouter.post("/edit/:course_id", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const permissions = getPermissions(req.user.role);
    const fields_changed = req.query;
    const course_id = req.params.course_id;
    const found_course = await Course.findOne({_id: course_id}) as ICourse;

    if (found_course.proposal_status === PROPOSAL_STATUS.DIRECTOR_REVIEW && !permissions.can_edit_submission_while_under_review) {
        res.status(401).json({
            message: "do not have permission to edit courses that are under review"
        });
        return;
    }

    if (!permissions.can_edit_submission_while_not_under_review) {
        res.status(401).json({
            message: "do not have permission to edit courses"
        });
        return;
    }

    try {
        await Course.updateOne({_id: course_id}, fields_changed);
        
        res.status(200).json({
            message: "editing course succeeded"
        });

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "editing course failed",
        });
    }
});

// NOT TO BE USED BY FRONTEND
courseRouter.get("/search-dev-only", async (req: IGetUserAuthInfoRequest, res: Response) => {
    // NEED TO DEAL WITH PARSING SEARCH PARAMS (perhaps express middleware)
    const search_term = req.query;
    try {
        // status_term must come after search_term to make sure that if proposed_status is in search term, the updated value in status_term overwrites it
        const result = await search(search_term); 
        res.status(200).json({result});
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "no course found with this search term",
        });
    }
});

// NOT TO BE USED BY FRONTEND
courseRouter.post("/submit-dev-only", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const proposalRequest = req.body as ICourse;
    const newCourse = await Course.create({
        ...proposalRequest
    });
    res.status(200).json({newCourse});
});

courseRouter.post("/accept", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const permissions = getPermissions(req.user.role);
    if (permissions.can_accept_reject_courses) {
        const course = req.body as ICourse;
        if (req.user.role == ROLES.UG_DIRECTOR && course.is_undergrad) {
            course.proposal_status = PROPOSAL_STATUS.DIRECTOR_ACCEPTED;
        } else if (req.user.role == ROLES.GRAD_DIRECTOR && !course.is_undergrad) {
            course.proposal_status = PROPOSAL_STATUS.DIRECTOR_ACCEPTED;
        } else if (req.user.role == ROLES.MANAGER) {
            course.proposal_status = PROPOSAL_STATUS.CCC_ACCEPTED;
        } else {
            res.status(401).json({
                message: "do not have permission to accept this specific course",
            });
        }
    } else {
        res.status(401).json({
            message: "do not have permission to accept courses"

        });
    }
});

courseRouter.post("/reject", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const permissions = getPermissions(req.user.role);
    if (permissions.can_accept_reject_courses) {
        const course = req.body as ICourse;
        if (req.user.role == ROLES.UG_DIRECTOR && course.is_undergrad) {
            course.proposal_status = PROPOSAL_STATUS.DIRECTOR_REJECTED;
        } else if (req.user.role == ROLES.GRAD_DIRECTOR && !course.is_undergrad) {
            course.proposal_status = PROPOSAL_STATUS.DIRECTOR_REJECTED;
        } else if (req.user.role == ROLES.MANAGER) {
            course.proposal_status = PROPOSAL_STATUS.CCC_REJECTED;
        } else {
            res.status(401).json({
                message: "do not have permission to reject this specific course",
            });
        }
    } else {
        res.status(401).json({
            message: "do not have permission to reject courses"

        });
    }
});

export default courseRouter;
