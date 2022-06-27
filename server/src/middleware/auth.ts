import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser
}

// check if user is authenticated
export const authCheck = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).send("Unauthorized - must be logged in");
  } else {
    next();
  }
};
