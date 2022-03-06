import { Request, Response, Router } from "express";
import User from "../models/User";

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
            message: "getting users failed",
        });
    }
}
);

export default userRouter;