import dotenv from "dotenv";

dotenv.config();

export default {
    mongoURI: process.env.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    facebookAppID: process.env.FACEBOOK_APP_ID || "",
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET || "",
    googleClientID: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
