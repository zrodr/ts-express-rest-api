import Resource from './Resource';

export default interface Service {
  /* 
   * The base functionality of one of our API's services.
   * Other possible functions: 
   *  - get specific members of Resource object by name
   *  - run full text search on a certain member
   */


  /* 
   * Utilizes the data model to insert a new resource into the DB
   * 
   * @param  {Resource}        resource The object representing data to be inserted
   * 
   * @return {Promise<Resource>} result The newly created resource object
   * @throws {InvalidBodyError}  error  On invalid request body data 
   * @throws {RESTEndpointError} error  On database error (internal server error) 
   */
  create(resource: Resource): Promise<Resource>;

  /* 
   * Utilizes the data model to retrieve all resources of a given type
   * 
   * @return {Promise<Resource[]>} result The list of fetched resources
   * @throws {RESTEndpointError}   error  On database error (internal server error) 
   */
  getAll(): Promise<Resource[]>;

  /* 
   * Utilizes the data model to retrieve a resource with the given id
   * @param  {string}              id     The id of the desired item
   * 
   * @return {Promise<Resource>}   result The fetched resource object
   * @throws {RESTEndpointError}   error  On database error (internal server error) 
   */
  get(id: string): Promise<Resource>;

  /* 
   * Utilizes the data model to update a resource with the given id
   * 
   * @param  {string}          id       The id of the desired item
   * @param  {Resource}        resource The object representing the new data
   * 
   * @return {Promise<Resource>} result The new version of the updated resource object
   * @throws {InvalidBodyError}  error  On invalid request body data 
   * @throws {RESTEndpointError} error  On database error (internal server error) 
   */
  update(id: string, resource: Resource): Promise<Resource>;

  /* 
   * Utilizes the data model to retrieve a resource with the given id
   * @param  {string}            id     The id of the desired item
   * 
   * @return {Promise<void>}     result The fetched resource object
   * @throws {RESTEndpointError} error  On database error (internal server error) 
   */
  delete(id: string): Promise<void>;
}