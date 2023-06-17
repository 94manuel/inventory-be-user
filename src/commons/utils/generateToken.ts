import jwt from "jsonwebtoken";
import { IUser } from "../../models/User";
import config from "../../config";

const generateToken = (user: IUser): string => {
    const payload = {
        id: user.id,
        email: user.contac.email,
    };

    return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
};

export default generateToken;
