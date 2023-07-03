import { Request, Response } from 'express';
import User, { IUser } from '../../models/User';

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        const user: IUser | null = await User.findOne({
            "security.resetPasswordToken": token,
            "security.resetPasswordExpires": { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token de reinicio de contraseña inválido o expirado' });
        }

        user.security.password = newPassword;
        user.security.resetPasswordToken = undefined;
        user.security.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al reiniciar la contraseña' });
    }
};
