import { RequestHandler, Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import InvalidRequestBodyError from '../util/error/InvalidRequestBodyError';

export default function bodyValidator(schema: Joi.Schema): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      });

      req.body = validatedBody;
      next();
    } catch (e: any) {
      next(
        new InvalidRequestBodyError(
          e.details.map((err: Joi.ValidationErrorItem) => err.message)
        )
      );
    }
  };
}
