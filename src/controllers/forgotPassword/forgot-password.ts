import { Request, Response } from "express";
import User from "../../models/User";
import { sendPasswordResetEmail } from "../../commons/utils/email";
import crypto from "crypto";

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ "contac.email": email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.security.resetPasswordToken = resetPasswordToken;
        user.security.resetPasswordExpires = new Date(resetPasswordExpires);
        await user.save();

        // send email
        await sendPasswordResetEmail(user.contact.email, resetPasswordToken);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
