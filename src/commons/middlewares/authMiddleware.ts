import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = "4a4a4a4a" || process.env.JWT_SECRET!;

interface IRequestWithUserId extends Request {
    userId?: string;
}

export const authMiddleware = (req: IRequestWithUserId, res: Response, next: NextFunction) => {
    try {
        const authorization = req.header('Authorization');

        if (authorization) {
            const token = authorization.replace('Bearer', '').trim();
            const decoded = jwt.verify(token, jwtSecret) as { userId: string };
            (req as any).user = decoded;
            return next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
