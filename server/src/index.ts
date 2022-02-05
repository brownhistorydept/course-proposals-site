if (process.env.NODE_ENV !== "production") {
  const path = require("path");
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";


export function main() {

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
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

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


  app.use("/auth", authRouter);

  // set up cors to allow us to accept requests from front end client
  app.use(
    cors({
        origin: process.env.CLIENT_URL || "",
        methods: "GET,PUT,DELETE",
        credentials: true,
    })
  );

  // start server
  app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT}`);
  });

}

main();



