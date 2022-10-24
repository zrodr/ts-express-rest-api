import { Request, Response, NextFunction } from 'express';

import RESTEndpointError from '../util/error/RESTEndpointError';
import EndpointNotFoundError from '../util/error/EndpointNotFoundError';

export const routeError = (
  err: RESTEndpointError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.httpResponseCode).json({
    name: err.name,
    message: err.message,
  });
};

export const routeNotFound = (req: Request, res: Response) => {
  const err: EndpointNotFoundError = new EndpointNotFoundError(req.url);

  res.status(err.httpResponseCode).json({
    name: err.name,
    message: err.message,
  });
};
