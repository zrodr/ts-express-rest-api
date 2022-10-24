import { Request, Response, NextFunction, Router } from 'express';
import IdParamRequest from './requests/IdParamRequest';
import Resource from './Resource';
import IdResponse from './responses/IdResponse';
import Service from './Service';

export default interface RESTEndpointController {
  path: string;
  router: Router;
  service: Service;

  /*
   * Inserts a new resource into the DB
   *
   * @return {Response<IdResponse>} result Contains id of newly created item
   */

  create(
    req: Request<{}, IdResponse, Resource>,
    res: Response<IdResponse>,
    next: NextFunction
  ): Promise<Response | void>;

  /*
   * Retrieves all resources of a given type
   *
   * @return {Response<Resource[]>} result List of items returned by query
   */

  getAll(
    req: Request,
    res: Response<Resource[]>,
    next: NextFunction
  ): Promise<Response | void>;

  /*
   * Retrieve a single resource by Id
   *
   * @return {Response<Resource>} result The record retrieved from the DB if found
   */

  getOne(
    req: Request<IdParamRequest>,
    res: Response<Resource>,
    next: NextFunction
  ): Promise<Response | void>;

  /*
   * Edit a single resource by Id
   *
   * @return {Response<IdResponse>} result Contains id of the edited resource
   */

  update(
    req: Request<IdParamRequest, IdResponse, Resource>,
    res: Response<IdResponse>,
    next: NextFunction
  ): Promise<Response | void>;

  /*
   * Delete the resource with a specified Id
   *
   * @return {Response<{}>} result Empty object on successful delete
   */
  delete(
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction
  ): Promise<Response | void>;
}
