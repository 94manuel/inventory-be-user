import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "../../config";
import User from "../../models/User";

export const facebookAuth = new FacebookStrategy(
    {
        clientID: config.facebookAppID,
        clientSecret: config.facebookAppSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "email"],
    },
    async (_accessToken, _refreshToken, profile:any, done) => {
        try {
            const user = await User.findOne({ facebookId: profile.id });

            if (user) {
                return done(null, user);
            }

            const newUser = await User.create({
                facebookId: profile.id,
                email: profile.emails[0].value,
            });

            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }
);
