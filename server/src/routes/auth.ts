import { Request, Response, Router } from "express";
import passport from "passport";
import { authCheck, IGetUserAuthInfoRequest } from "../middleware/auth";

const authRouter = Router();

// auth with google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    hd: "brown.edu", // limits the authentication to brown.edu addresses
    scope: ["profile", "email"],
    prompt: "select_account",
    successRedirect: `${process.env.CLIENT_URL}/course_catalog`,
    failureRedirect: `${process.env.CLIENT_URL}`,
  })
);

// redirect to home page after successfully login via google
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/course_catalog`,
    failureRedirect: "/auth/login/failed",
    failureMessage: "/auth/login/failed",
  })
  // TODO: add a res.redirect to homepage on front end with an error message attached in json if login fails
);

// when login success, retrieve user info
authRouter.get(
  "/login/success",
  (req: IGetUserAuthInfoRequest, res: Response) => {
    res.status(200).json({
      success: true,
      message: "user authentication successful",
      user: req.user,
    });
  }
);

// when login fails, send failed message
authRouter.get("/login/failed", (_req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate",
  });
});

interface ILogoutRequest extends Request {
  logout: any;
}

authRouter.get("/logout", function (req: ILogoutRequest, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL || "/");
  });
});

// just to test if authCheck actually works
authRouter.get(
  "/check-auth",
  authCheck,
  (req: IGetUserAuthInfoRequest, res: Response) => {
    // console.log(req);
    // console.log(6969);
    res.status(200).json({
      success: true,
      message: "user authenticated",
      user: req.user,
    });
  }
);

export default authRouter;
