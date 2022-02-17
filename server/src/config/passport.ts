import passport from "passport";
import {
    Profile,
    Strategy as GoogleStrategy,
    VerifyCallback,
} from "passport-google-oauth20";
import IRole from "../models/Roles";
import User, { IUser } from "../models/User";

function get_role(role) {

    // const ROLES = ["student", "professor", "undergraduate reviewer", 
    // "undergraduate director", "graduate director", "manager"];

    if (role == "student") {
        const student_role: IRole = {
            role: "student",
            names: "", // what is this field for?
            can_submit_courses: false,
            can_edit_submission_while_not_under_review: false,
            can_edit_submission_while_under_review: false,
            can_review_undergrad_courses: false,
            can_review_graduate_courses: false,
            can_request_professor_action: false,
            can_accept_reject_courses: false,
            // says missing created_at, but doesn't have
            // that problem for new User? Seems like it should use the default in roleSchema,
            // but we never actually export or use that -- should that go in a separate file 
            // so we can actually export it? Confused about when to be using IRole and when to use Role model
            created_at: Date.now,
        },
        return student_role;
    } // continue with else ifs for other possible roles

}

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
                // creates a new user object
                const newUser: IUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile._json.email,
                    role: get_role("student"),
                };
                try {
                    // searches for user in mongoDB collection by googleId
                    let user = await User.findOne({ googleId: profile.id });
                    if (user) {
                        // gets user if user exists in mongoDB collection
                        done(null, user);
                    } else {
                        // creates new user if not in mongoDB collection
                        user = await User.create(newUser);
                        // TODO: give student role by default
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );
}