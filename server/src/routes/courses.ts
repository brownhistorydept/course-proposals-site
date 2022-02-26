import { Request, Response, Router } from "express";
import User, { IUser } from "../models/User";
import Course, { ICourse } from "../models/Course"
import { authCheck, IGetUserAuthInfoRequest } from "../middleware/auth";
import { get_permissions } from "../models/Permissions";

const courseRouter = Router();

// get all courses
courseRouter.get("/all", async (req: Request, res: Response) => {
    // might have to use populate to get prof information from users table
    
    try {
        const results = await Course.find({});
        res.status(200).json({results});
        console.log(results);
    } catch (err) {
        res.status(401).json({
            message: "getting courses failed",
        });
    }
}
);

// create a course
courseRouter.post("/create", (req: IGetUserAuthInfoRequest, res: Response) => {

    const permissions = get_permissions(req.user.role);

    if (permissions.can_submit_courses) {
        // do stuff!
    } else {
        // throw error
    }

}
);

export default courseRouter;