import RESTEndpointError from "./RESTEndpointError";

export default class EndpointNotFoundError extends RESTEndpointError {
  constructor(route: string) {
    super(`route '${route}' is unsupported!`, 404);
    this.name = 'EndpointNotFoundError';
  }
}