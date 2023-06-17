import { RouterUser } from "./user";
import express, { NextFunction, Request, Response } from "express";

export class Init {
    public app: express.Application;
    public routerUser: RouterUser = new RouterUser;

    constructor() {
        this.app = express();
        this.start();
    }

    public start() {
        this.app.all("/*", this.routerUser.app);
    }


}
const init = new Init();
export default init;