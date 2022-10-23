import { Router, Request, Response, NextFunction } from 'express';

import RESTEndpointController from '../../util/interfaces/RESTEndpointController';
import IdParamRequest from '../../util/interfaces/requests/IdParamRequest';
import IdResponse from '../../util/interfaces/responses/IdResponse';

import User from './User';
import UserService from './user-service';

export default class UserController implements RESTEndpointController {
  path: string;
  router: Router;
  service: UserService;

  constructor() {
    this.path = '/user';
    this.router = Router();
    this.service = new UserService();

    // TODO: add middleware to validate request body for create/update, so the service
    // can just focus on working with data we know is valid.
    this.router.route(this.path)
      .post(this.create)
      .get(this.getAll);

    this.router.route(`${this.path}/:resourceId`)
      .get(this.getOne)
      .put(this.update)
      .delete(this.delete);
  }

  public create = async (
    req: Request<{}, IdResponse, User>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void> => {

    try {
      const result = await this.service.create(req.body);
      res.status(201).json({
        id: result._id,
      });
    }
    catch (e) {
      next(e);
    }
  }

  public getAll = async (
    req: Request,
    res: Response<User[]>,
    next: NextFunction): Promise<Response | void> => {

    try {
      const results = await this.service.getAll();
      res.status(200).json(results);
    }
    catch (e) {
      next(e);
    }
  }

  public getOne = async (
    req: Request<IdParamRequest>,
    res: Response<User>,
    next: NextFunction): Promise<Response | void> => {

    const id = req.params.resourceId;

    try {
      const user = await this.service.get(id);
      res.status(200).json(user);
    }
    catch (e) {
      next(e);  
    }
  }
  
  public update = async (
    req: Request<IdParamRequest, IdResponse, User>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void> => {
    
    const id = req.params.resourceId;
  
    try {
      await this.service.update(id, req.body);
      res.status(200).json({ id });
    }
    catch (e) {
      next(e);  
    }
  }

  public delete = async (
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction): Promise<Response | void> => {
    
    const id = req.params.resourceId;

    try {
      await this.service.delete(id);
      res.status(200).json({});
    }
    catch (e) {
      next(e);  
    }
  }
}