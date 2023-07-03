import {ValidationError} from "joi";
import {Request, Response, NextFunction} from "express";

export const JoiBodyValidatorMiddleware = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {error, value} = schema.validate(req.body);
        if (error) {
            validateSchemaFromOriginData(error, res, 'JoiBodyValidatorMiddleware');
            return;
        }
        req.body = value;
        next();
    };
}
const validateSchemaFromOriginData = (error: ValidationError, res: Response, originError: string) => {
    //functions.logger.log(`${originError} error: `, error);
    res.status(406).json(error.details.map((d: any) => d.message));
}