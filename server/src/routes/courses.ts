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

// create a course
courseRouter.post("/create", async (req: IGetUserAuthInfoRequest, res: Response) => {

    const permissions = get_permissions(req.user.role);

    if (permissions.can_submit_courses) {
  
        const newCourse: ICourse = {
            course_number: req.body.course_number,
            course_title: req.body.course_title,
            crn: req.body.crn || '',
            semester: req.body.semester,
            year: req.body.year,
            final_time: req.body.final_time,
            time_ranking: req.body.time_ranking || [],
            professors: req.body.professor_ids,
            is_DIAP: req.body.is_DIAP,
            is_WRIT: req.body.is_WRIT,
            is_Premodern: req.body.is_Premodern,
            course_type: req.body.course_type,
            geography: req.body.geography,
            is_remote: req.body.is_remote,
            is_intro: req.body.is_intro,
            description: req.body.description,
            further_notes: req.body.further_notes || ''
        };
        const course = await Course.create(newCourse);
        console.log(course);
        res.status(200).json({course});
    } else {
        res.status(401).json({
            message: "user does not have permission to create a course",
        });
    }
}
);

export default courseRouter;