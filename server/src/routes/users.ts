import { Request, Response, Router } from "express";
import { IGetUserAuthInfoRequest } from "../middleware/auth";
import User from "../models/User";
import { ROLES } from "../models/Permissions"

const userRouter = Router();

// get all users
userRouter.get("/all", async (req: Request, res: Response) => {
    try {
        const results = await User.find({});
        res.status(200).json({results});
        console.log(results);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "getting all users failed",
        });
    }
});

// get all professors
userRouter.get("/professors", async (req: Request, res: Response) => {
    try {
        const results = await User.find({$or: 
            [{role: ROLES.PROFESSOR}, {role: ROLES.CURRIC_COORD}, {role: ROLES.UG_DIRECTOR}, {role: ROLES.GRAD_DIRECTOR}]});
        res.status(200).json({results});  
        console.log(results);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "getting all professors failed",
        });
    }
}
);

// change user's role; this should only be used by managers
// id is the string form of the _id of the user whose role is being changed, role is their new role as a string
userRouter.post("/change-role/:id/:role", async (req: IGetUserAuthInfoRequest, res: Response) => {
    if (typeof req.params.id === 'undefined') {
        res.status(401).json({
            message: "specify the user whose role is to be changed",
        });
        return;
    }

    if (typeof req.params.role === 'undefined') {
        res.status(401).json({
            message: "specify the new role",
        });
        return;
    }

    if (!Object.values(ROLES).includes(req.params.role)) {
        res.status(401).json({
            message: `role must be one of ${Object.values(ROLES)}`,
        });
        return;
    }
    
    if (req.user.role !== ROLES.MANAGER) {
        res.status(401).json({
            message: "only managers can change roles",
        });
        return;
    }

    const user = req.params.id;
    
    try {
        await User.updateOne({_id: user}, {
            role: req.params.role
        });
        
        res.status(200).json({
            message: "updating role succeeded"
        });

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "updating role failed",
        });
    }
});

export default userRouter;
