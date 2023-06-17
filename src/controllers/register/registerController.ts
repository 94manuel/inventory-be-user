import { Request, Response } from "express";
import User, { IUser } from "../../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../../commons/utils/generateToken";

export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ "contac.email": email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = new User({
            contac: { email },
            security: { password: hashedPassword },
        });

        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ status: 200, user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
