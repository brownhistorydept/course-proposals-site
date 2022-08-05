import passport from "passport";
import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import User, { IUser } from "../models/User";
import { ROLES } from "../models/User"

export function passportInit() {
  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.error(err);
        done(new Error("failed to deserialize an user"));
      });
  });

  // sets up the GoogleStrategy with a callback function
  // the callback function checks if a User exists in the MongoDB collection
  // if not, it creates a new user object, else it retrieves the existing user object
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" // allows Google+ to be disabled
    },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        // error checking
        if (!profile) {
          done(new Error("Profile is undefined"));
          return;
        }
        if (profile._json.hd !== "brown.edu") {
          // ensures email domain is brown.edu
          done(new Error("Invalid domain!"));
          return;
        }

        // set profile photo
        let displayPicURL = "https://i.ibb.co/WKq909Y/profile.webp"; // default
        if (profile.photos) {
          displayPicURL = profile.photos[0].value;
        }

        try {
          // searches for user in mongoDB collection by googleId
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            // gets user if user exists in mongoDB collection
            console.log('found user by googleid')
            done(null, user);
          } else {
            // if no google id, try email
            // this will be how all prefilled professors log in for the first time
            user = await User.findOne({email: profile._json.email});
            if (user) {
              console.log('found user by email')
              console.log(user)
              // update user to have googleId so they can log in normally next time
              await User.updateOne({_id: user._id}, {googleId: profile.id})
              done(null, user)
            } else {
              // creates a new user object
              const newUser: IUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile._json.email,
                displayPictureURL: displayPicURL,
                role: ROLES.DEFAULT,
              };
              // creates new user if not in mongoDB collection
              user = await User.create(newUser);
              done(null, user);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
}
