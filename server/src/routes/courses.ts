import { Response, Router } from "express";
import Course, { ICourse, PROPOSAL_STATUS, COURSE_STATUS } from "../models/Course"
import { IGetUserAuthInfoRequest, authCheck } from "../middleware/auth";
import { ROLES } from "../models/User";

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
courseRouter.get("/search/:finalized", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {
    
    // restrict searches based on role
    let restrictions;

    if (req.user.role == ROLES.GRAD_DIRECTOR) {
        restrictions = {is_undergrad: false};
    } else if (req.user.role == ROLES.UG_DIRECTOR) {
        restrictions = {is_undergrad: true};
    } else if (req.user.role == ROLES.PROFESSOR) {
        restrictions = {professor: req.user._id};
    } else if (req.user.role == ROLES.DEFAULT) {
        restrictions = {proposal_status: PROPOSAL_STATUS.CCC_ACCEPTED};
    }

    const search_term = req.query;
    let finalized_term = {};

    if (!search_term.proposal_status && typeof req.params.finalized !== 'undefined') { // if finalized exists (has been set)
        if (strToBool(req.params.finalized)) { // if finalized is true
            finalized_term = {proposal_status: PROPOSAL_STATUS.CCC_ACCEPTED};
        } else { // want proposed courses
            finalized_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}};
        }
    }
    
    try {
        const result = await search({...search_term, ...finalized_term, ...restrictions}); 
        if (result.length == 0) {
            res.status(400).json({
                message: "No results found.",
            });
        } else {
            res.status(200).json({result});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "at least one of the fields in the search term has the wrong type; see ICourse in models/Courses.ts for correct types",
        });
    }  
});

// NOT TO BE USED BY FRONTEND
courseRouter.get("/search-dev-only/:finalized", async (req: IGetUserAuthInfoRequest, res: Response) => {
    const search_term = req.query;
    let finalized_term = {};

    if (!search_term.proposal_status && typeof req.params.finalized !== 'undefined') { // if finalized exists (has been set)
        if (strToBool(req.params.finalized)) { // if finalized is true
            finalized_term = {proposal_status: PROPOSAL_STATUS.CCC_ACCEPTED};
        } else { // want proposed courses
            finalized_term = {proposal_status: {$ne: PROPOSAL_STATUS.CCC_ACCEPTED}};
        }
    }
    
    try {
        const result = await search({...search_term, ...finalized_term}); 
        if (result.length == 0) {
            res.status(400).json({
                message: "No results found.",
            });
        } else {
            res.status(200).json({result});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "at least one of the fields in the search term has the wrong type; see ICourse in models/Courses.ts for correct types",
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
    original?: ICourse, 
    proposed: ICourse, 
}

// submit a course
courseRouter.post("/submit", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {
    const proposalRequest = req.body as ICourseProposalRequest;
    const status = getCourseStatus(proposalRequest.proposed, proposalRequest.original);

    if ((await Course.find(proposalRequest.proposed)).length > 0) { // duplicate course
        res.status(400).json({
            message: "cannot submit a duplicate course",
        });
        return;
    }
    
    if (req.user.role !== ROLES.DEFAULT) {
        const newCourse = await Course.create({
            ...proposalRequest.proposed, 
            proposal_status: PROPOSAL_STATUS.DIRECTOR_REVIEW, 
            course_status: status
        });
        res.status(200).json({newCourse});
        console.log("returning success");
        console.log(newCourse);

        // TODO: notify relevant parties via email
    } else {
        console.log("returning failure");
        res.status(400).json({
            message: "submission failed",
        });
    }
});

// edit a course
courseRouter.post("/edit", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {
    const course = req.body as ICourse;

    if (req.user.role !== ROLES.MANAGER) {
        // if you don't own the course
        if (!course.professors.includes(req.user._id)) { 
            res.status(403).json({
                message: "Do not have permission to edit another professor's course"
            });
            return;
        } else if (
            course.proposal_status != PROPOSAL_STATUS.CCC_REJECTED && 
            course.proposal_status != PROPOSAL_STATUS.DIRECTOR_REJECTED && 
            course.proposal_status != PROPOSAL_STATUS.DIRECTOR_REVIEW) {
                res.status(403).json({
                    message: "Cannot edit a course unless proposal status is under review by a director, rejected by director, or rejected by CCC"
                });
                return;
        }
    }

    try {
        await Course.updateOne({_id: course._id}, course);
        
        res.status(200).json({
            message: "editing course succeeded"
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "editing course failed",
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

courseRouter.post("/accept", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {

    if (req.user.role === ROLES.MANAGER || req.user.role === ROLES.GRAD_DIRECTOR || req.user.role === ROLES.UG_DIRECTOR ) {
        const course = req.body as ICourse;
        let new_status;
        if (req.user.role == ROLES.UG_DIRECTOR && course.is_undergrad) {
            new_status = PROPOSAL_STATUS.DIRECTOR_ACCEPTED;;
        } else if (req.user.role == ROLES.GRAD_DIRECTOR && !course.is_undergrad) {
            new_status = PROPOSAL_STATUS.DIRECTOR_ACCEPTED;
        } else if (req.user.role == ROLES.MANAGER) {
            new_status = PROPOSAL_STATUS.CCC_ACCEPTED;
        } else {
            res.status(403).json({
                message: "do not have permission to accept this specific course",
            });
        }

        try {
            await Course.updateOne({_id: course._id}, {proposal_status: new_status});
            
            res.status(200).json({
                message: "accepting course succeeded"
            });
    
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "accepting course failed",
            });
        }

    } else {
        res.status(403).json({
            message: "do not have permission to accept courses"

        });
    }
});

courseRouter.post("/reject", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {
    
    if (req.user.role === ROLES.MANAGER || req.user.role === ROLES.GRAD_DIRECTOR || req.user.role === ROLES.UG_DIRECTOR ) {
        let new_status;
        const course = req.body as ICourse;
        if (req.user.role == ROLES.UG_DIRECTOR && course.is_undergrad) {
            new_status = PROPOSAL_STATUS.DIRECTOR_REJECTED;
        } else if (req.user.role == ROLES.GRAD_DIRECTOR && !course.is_undergrad) {
            new_status = PROPOSAL_STATUS.DIRECTOR_REJECTED;
        } else if (req.user.role == ROLES.MANAGER) {
            new_status = PROPOSAL_STATUS.CCC_REJECTED;
        } else {
            res.status(403).json({
                message: "do not have permission to reject this specific course",
            });
        }

        try {
            await Course.updateOne({_id: course._id}, {proposal_status: new_status});
            
            res.status(200).json({
                message: "accepting course succeeded"
            });
    
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "accepting course failed",
            });
        }


    } else {
        res.status(403).json({
            message: "do not have permission to reject courses"

        });
    }
});

export default courseRouter;
