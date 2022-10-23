export default class RESTEndpointError extends Error {
  httpResponseCode: number;
  name: string;

  constructor(message: string, httpResponseCode: number) {
    super(message);
    this.httpResponseCode = httpResponseCode;

    Object.setPrototypeOf(this, RESTEndpointError.prototype);
    this.name = 'RESTEndpointError';
  }
}