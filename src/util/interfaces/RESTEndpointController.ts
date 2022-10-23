import { Request, Response, NextFunction, Router } from 'express';
import IdParamRequest from './requests/IdParamRequest';
import IdResponse from './responses/IdResponse';

export default interface RESTEndpointController {
  path: string;
  router: Router;

  // TODO: create interface types for whatever data we'll be working with
  
  /* 
   * Inserts a new item into the DB
   * @param  {Request} req   
   *                                          values the row content
   * 
   * @return {Response<IdResponse>}    queryResult     results object or null if no rows affected
   */

  create(
    req: Request<{}, {}>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void>;

  /* 
   * Retrieves all resources of a given type
   *
   * @return {Response<ResourceType[]>}    queryResult   database rows returned by query
   */

  getAll(
    req: Request,
    res: Response<[]>,
    next: NextFunction): Promise<Response | void>;

  /* 
   * Retrieve a single resource by Id
   * @param  {number}         objectId     Used to identify the desired DB resource
   * 
   * @return {Response<ResourceType>}    queryResult  The record retrieved from the DB if found
   */

  getOne(
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction): Promise<Response | void>;

  /*
   * Edit a single resource by Id
   * @param  {number}         objectId     Used to identify the desired DB resource
   * 
   * @return {Response<IdResponse>}    queryResult  results object or null if no rows affected
   */

  update(
    req: Request<IdParamRequest, {}>,
    res: Response<IdResponse>,
    next: NextFunction): Promise<Response | void>;

  /*
   * Delete the resource with a specified Id
   * @param  {number}         objectId     Used to identify the desired DB resource
   * 
   * @return {Response<{}>}    queryResult  results object or null if no rows affected
   */
  delete(
    req: Request<IdParamRequest>,
    res: Response<{}>,
    next: NextFunction): Promise<Response | void>;
}