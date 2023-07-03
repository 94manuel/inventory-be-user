import {ValidationError} from "joi";
import {Request, Response, NextFunction} from "express";

export const JoiParamsValidatorMiddleware = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.params);
        if (error) {
            validateSchemaFromOriginData(error, res, 'JoiValidatorParamsMiddleware');
            return;
        }
        next();
    }
}
const validateSchemaFromOriginData = (error: ValidationError, res: Response, originError: string) => {
    //functions.logger.log(`${originError} error: `, error);
    res.status(406).json(error.details.map((d: any) => d.message));
}