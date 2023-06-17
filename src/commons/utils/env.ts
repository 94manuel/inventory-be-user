import dotenv from "dotenv";

dotenv.config();

const env = {
    EMAIL: {
        FROM:process.env.EMAIL_FROM,
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT,
        SECURE: process.env.EMAIL_SECURE,
        USER: process.env.EMAIL_USER_EMAIL,
        PASSWORD: process.env.EMAIL_PASSWORD_EMAIL
    },
    AUTH: {
        JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
        EXPIRES_IN:process.env.EXPIRES_IN
    },
    CRYPTO: {
        ALGORITHM: process.env.CRYPTO_ALGORITHM,
        SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    },
    S3: {
        ACL:process.env.S3_ACL,
        CONTENT_ENCODING: process.env.S3_CONTENT_ENCODING,
        CONTENT_TYPE: process.env.S3_CONTENT_TYPE,
        BUCKET_NAME: process.env.S3_BUCKET_NAME
    },
};

module.exports = env;