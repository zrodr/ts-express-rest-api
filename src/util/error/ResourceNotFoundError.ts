import RESTEndpointError from './RESTEndpointError';

export default class ResourceNotFoundError extends RESTEndpointError {
  constructor(resourceName: string, id: string) {
    super(`${resourceName} with id ${id} does not exist!`, 404);
    this.name = 'ResourceNotFoundError';
  }
}
