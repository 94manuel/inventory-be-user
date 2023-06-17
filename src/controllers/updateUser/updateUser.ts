import { Request, Response } from 'express';
import User, { IUser } from '../../models/User';
import mongoose from "mongoose";

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombreCompleto, puestoTrabajo, permisos, tiendas, security, contact } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const updatedUser: IUser | null = await User.findByIdAndUpdate(
            id,
            { nombreCompleto, puestoTrabajo, permisos, tiendas, security, contact },
            { new: true }
        ) as IUser;

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    }

    catch (error:any) {
            res.status(500).json({ message: error.message });
        }
};
