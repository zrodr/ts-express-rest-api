import { Router, Request, Response, NextFunction } from "express";

import RESTEndpointController from '../../util/interfaces/RESTEndpointController';
import IdParamRequest from '../../util/interfaces/requests/IdParamRequest';
import IdResponse from 'util/interfaces/responses/IdResponse';

import User from './User';
import UserService from './user-service';

export default class UserController implements RESTEndpointController {
  path = '/user';
  router = Router();
  private userService: UserService;

  constructor() {
    this.userService = new UserService();

    this.router.route(this.path)
      .post(this.create)
      .get(this.getAll);

    this.router.route(`${this.path}/:resourceId`)
      .get(this.getOne)
      .put(this.update)
      .delete(this.delete);
  }

  public create = async (
    req: Request<{}, User>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void> => {

    try {
      const { username, email, password, phoneNumber } = req.body;
      const result = await this.userService.create(username, email, password, phoneNumber);

      console.log(result);

      res.status(201).json({
        id: result._id
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
      const results = await this.userService.getAll();
      res.status(200).json(results);
    }
    catch (e) {
      next(e);
    }
  }

  /* TODO */
  public getOne = async (
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction): Promise<Response | void> => {
    const id = req.params.resourceId;

    res.status(200).json({
      /* username: 'test',
      email: 'test@testmail.com',
      password: 'hfoq19114jr',

      createDate: new Date(),
      lastLogin: new Date() */
    });
  }
  
  /* TODO */
  public update = async (
    req: Request<IdParamRequest, IdResponse, User>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void> => {
    const id = req.params.resourceId;
    const { username, email, password } = req.body;

    res.status(200).json({
      id
    });
  }

  /* TODO */
  public delete = async (
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction): Promise<Response | void> => {
    const id = req.params.resourceId;

    res.status(200).json({});
  }
}