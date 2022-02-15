import { Request, Response, Router } from "express";
import passport from "passport";
import User, { IUser } from "../models/User";
import { authCheck } from "../middleware/auth";

const authRouter = Router();

// auth with google
authRouter.get("/google",
    passport.authenticate("google", {
        hd: "brown.edu", // limits the authentication to brown.edu addresses
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

// redirect to home page after successfully login via google
authRouter.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL || "http://localhost:3000",
        failureRedirect: process.env.CLIENT_URL,
        failureMessage: "/auth/login/failed",
    })
    // TODO: add a res.redirect to homepage on front end with an error message attached in json if login fails
);

// // when login success, retrieve user info
// authRouter.get("/login/success", (req: Request, res: Response) => {
//     if (req.user) {
//         User.findByIdAndUpdate(
//             (req.user as IUser)._id,
//             { lastLoggedIn: new Date() },
//             (err, user) => {
//                 if (err) {
//                     res.status(500).send(err);
//                 } else {
//                     res.status(200).json({
//                         success: true,
//                         message: "user authentication successful",
//                         user,
//                     });
//                 }
//             }
//         );
//     } else {
//         // user is not authenticated
//         res.redirect("/auth/login/failed");
//     }
// });

// when login fails, send failed message
authRouter.get("/login/failed", (_req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate",
    });
});

// when logout, redirect to client
authRouter.get("/logout", (req: Request, res: Response) => {
    // req.logout(); -- seems like this is from Passport.js
    res.redirect(process.env.CLIENT_URL || "/");
});

// just to test if authCheck actually works
authRouter.get("/check-auth", authCheck, (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "user authenticated",
        // user: req.user,
    });
});

export default authRouter;