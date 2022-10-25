import RESTEndpointError from './RESTEndpointError';

export default class InvalidRequestBodyError extends RESTEndpointError {
  constructor(invalidFields: string[]) {
    super(
      `missing or invalid request body data: ${invalidFields.join(', ')}`,
      422
    );
    this.name = 'InvalidRequestBodyError';
  }
}
