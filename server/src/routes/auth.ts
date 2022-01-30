
import { Request, Response, Router } from "express";
import passport from "passport";


const authRouter = Router();

// auth apis will go here http://www.passportjs.org/docs/google/

authRouter.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});


// this all needs the config setup (see ../config/passport.ts) 


export default authRouter;



