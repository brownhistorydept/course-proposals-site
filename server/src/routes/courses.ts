import { Request, Response, Router } from "express";
import Course, { ICourse } from "../models/Course"
import { IGetUserAuthInfoRequest } from "../middleware/auth";
import { get_permissions } from "../models/Permissions";

const courseRouter = Router();

// search courses
courseRouter.get("/search", async (req: Request, res: Response) => {

    const search_term = JSON.parse(JSON.stringify(req.query));

    try {
        const results = await Course.find(search_term).populate('professors');
        res.status(200).json({results});
        console.log(results);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "no course found with this search term",
        });
    }
}
);

function get_course_status(proposed_course, original_course) {
    
    if (!original_course) {
        return "new";
    }

    if ((original_course.course_title === proposed_course.course_title) && 
        (original_course.description === proposed_course.description) &&  
        (original_course.is_DIAP === proposed_course.is_DIAP) &&  
        (original_course.is_remote === proposed_course.is_remote) &&  
        (original_course.is_WRIT === proposed_course.is_WRIT)) {
            return "existing";
        } else {
            return "revised";
        }
};

interface ICourseSubmission {
    course_number: String,
    crn?: Number,
    course_title: String,
    semester: String,
    year: Number,
    final_time: String,
    time_ranking?: String[],
    professors: String[], // this is the only difference from ICourse: this is just an array of Object IDs, gets populated later
    is_DIAP: Boolean,
    is_WRIT: Boolean,
    is_Premodern: Boolean,
    course_type: String,
    geography: String,
    is_remote: Boolean,
    is_intro: Boolean,
    description: String,
    further_notes?: String,
}

interface ICourseProposalRequest {
    original_course?: ICourse, // this is the course upon which the proposed course is based. Should pass back the full ICourse Object, including the populated professor IUser objects
    proposed_course: ICourseSubmission, // this will have professors as an array of strings, where each string is the professor's Object ID
}

// submit a course
courseRouter.post("/submit", async (req: IGetUserAuthInfoRequest, res: Response) => {

    const permissions = get_permissions(req.user.role);

    const original_and_proposed = req.body as ICourseProposalRequest;
    const status = get_course_status(original_and_proposed.proposed_course, original_and_proposed.original_course);

    if (permissions.can_submit_courses) {
        
        const newCourse = await Course.create({...original_and_proposed.proposed_course, proposal_status: "under review by director", course_status: status});
        res.status(200).json({newCourse});

        // TODO: notify relevant parties via email

    } else {
        res.status(401).json({
            message: "submission failed",
        });
    }
}
);

export default courseRouter;