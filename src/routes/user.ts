import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import generateToken from "../commons/utils/generateToken";
import { IUser } from "../models/User";
import { loginController } from "../controllers/login/login";
import { forgotPasswordController } from "../controllers/forgotPassword/forgot-password";
import { registerController } from "../controllers/register/registerController";
import { googleAuth } from "../controllers/google/googleController";
import bearerToken from "express-bearer-token";
import { resetPassword } from '../controllers/resetPassword/resetPassword';
import { loginSchema } from "../controllers/login/loginSchema";
import { registerSchema } from "../controllers/register/registerSchema";
import { authMiddleware } from "../commons/middlewares/authMiddleware";
import { JoiBodyValidatorMiddleware } from "../commons/middlewares/joi/joi-body-validator";
import {updateUser} from "../controllers/updateUser/updateUser";

export class RouterUser {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.start();
    }

    public start() {
        this.app.post('/user/register', JoiBodyValidatorMiddleware(registerSchema), registerController);
        this.app.post('/user/login', JoiBodyValidatorMiddleware(loginSchema), loginController);
        this.app.post('/user/forgot-password', forgotPasswordController);
        this.app.post('/user/reset-password', resetPassword);

        // this.app.patch('/user/login/google', googleAuth());
        this.app.put('/', updateUser);

        this.app.use(bearerToken())
        this.app.use(authMiddleware);

    }

}

const routerUser = new RouterUser();
export default routerUser;
