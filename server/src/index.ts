require('dotenv').config();

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRouter from "./routes/auth";

import * as passportConfig from "./config/passport";
import { mongoConnection } from "./config/mongo";

passportConfig.init();
const app = express();

mongoConnection();

// express session
app.use(
  session({
      secret: process.env.SESSION_SECRET || "",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 * 30 }, // 30 days cookie expiry
      store: MongoStore.create({
          mongoUrl: process.env.MONGODB_STRING,
          // mongoOptions: { useUnifiedTopology: true },
      }),
  })
);

// parse incoming cookies of html requests
app.use(cookieParser());
// parse body of http request
app.use(express.json());

// initialize and set up passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from front end client
app.use(
  cors({
      origin: process.env.CLIENT_URL || "",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
  })
);

// set up auth route
app.use("/auth", authRouter);

// server starts listening
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
//





// const userSchema = new mongoose.Schema ({
//   username: String,
//   name: String,
//   googleId: String,
//   secret: String
// });
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);
// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id, username: profile.emails[0].value }, function (err, user) {
//       if (err) {
//         console.log(err);
//       }
//       console.log(user);
//       return cb(err, user);
//     });
//   }
// ));