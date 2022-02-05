
import { Request, Response, Router } from "express";
import passport from "passport";


const authRouter = Router();

// auth apis will go here http://www.passportjs.org/docs/google/

authRouter.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});


authRouter.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

authRouter.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

//Define the Login Route
authRouter.get("/login", (req, res) => {
    console.log(`-------> User logging in`)
    res.render("./../public/views/login.ejs")
})

//Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
authRouter.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render(__dirname + "../../views/dashboard.ejs", {name: req.user.displayName})
})

//Define the Logout
authRouter.post("/logout", (req,res) => {
    req.logOut()
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})


export default authRouter;



