import path from "path"
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import authRouter from "./routes/auth";
import courseRouter from "./routes/courses";
import userRouter from "./routes/users";

import { passportInit } from "./config/passport";
import { mongoConnection } from "./config/mongo";

export function main() {
  passportInit();
  const app = express();

  mongoConnection();

  // express session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 * 30 }, // 30 days cookie expiry
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
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
      origin: process.env.CLIENT_URL,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  // set up routes
  app.use("/api/auth", authRouter);
  app.use("/api/courses", courseRouter);
  app.use("/api/users", userRouter);

  // server starts listening
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port 8080`);
  });
}
main();
