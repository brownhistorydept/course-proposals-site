import { NextFunction, Request, Response } from "express";

// check if user is authenticated
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    // if (!req.user) {
    //     res.status(401).send("Unauthorized - must be logged in");
    // } else {
    //     next();
    // }
};

// check if user is moderator
export const modCheck = (req: Request, res: Response, next: NextFunction) => {
    // const user: any = req.user;
    // if (!user || !user.moderator) {
    //     res.status(401).send("Unauthorized - must be moderator");
    // } else {
    //     next();
    // }
};