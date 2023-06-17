import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import config from "../../config";
import User from "../../models/User";

export const googleAuth = new GoogleStrategy(
    {
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile:any, done) => {
        try {
            const user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            }

            const newUser = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
            });

            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }
);
