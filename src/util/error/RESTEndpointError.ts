export default class RESTEndpointError extends Error {
  httpResponseCode: number;
  name: string;

  constructor(message: string, httpResponseCode: number) {
    super(message);
    this.httpResponseCode = httpResponseCode;
    this.name = 'RESTEndpointError';
  }
}