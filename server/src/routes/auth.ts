
import { Request, Response, Router } from "express";
import passport from "passport";


const authRouter = Router();

// auth apis will go here http://www.passportjs.org/docs/google/

authRouter.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});


// this all needs the config setup (see ../config/passport.ts) 

const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize())
app.use(passport.session())

// TODO: INSERT
const GOOGLE_CLIENT_ID = "108318053408-70egqlado3ahcqflcr87vqgl6g62qoda.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

function authUser(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  }, authUser));


passport.serializeUser( (user, done) => { 
    console.log(`\n--------> Serialize User:`)
    console.log(user)
     // The USER object is the "authenticated user" from the done() in authUser function.
     // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

    done(null, user)
} )

passport.deserializeUser((user, done) => {
        console.log("\n--------- Deserialized User:")
        console.log(user)
        // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
        // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

        done (null, user)
}) 


app.listen(3001, () => console.log(`Server started on port 3001...`))

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));

//Define the Login Route
app.get("/login", (req, res) => {
    res.render("../views/login.ejs")
})

//Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("../views/dashboard.ejs", {name: req.user.displayName})
})

//Define the Logout
app.post("/logout", (req,res) => {
    req.logOut()
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})


export default authRouter;



