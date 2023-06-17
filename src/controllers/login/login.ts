import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../../commons/utils/generateToken";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user: IUser | null = await User.findOne({ "contac.email": email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user.security.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "INVALID_PASSWORD" });
        }

        const token = generateToken(user);
        console.log(isValidPassword)
        res.status(200).json({ status: 200, token, user });
    } catch (error: any) {
        res.status(500).json({ message: "Server error" });
    }
};
