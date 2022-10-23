import express, { Application } from 'express';

import Env from './util/interfaces/Env';
import { DBHandler } from './util/interfaces/DBHandler';

import RESTEndpointController from 'util/interfaces/RESTEndpointController';
import { routeError, routeNotFound } from './middleware/errorhandlers';

class JSONAPIApplication {
  app: Application;
  env: Env;
  controllers: RESTEndpointController[];
  dbHandler: DBHandler;

  constructor(controllers: RESTEndpointController[], env: Env, dbHandler: DBHandler) {
    this.app = express();
    this.env = env;
    this.controllers = controllers;
    this.dbHandler = dbHandler;

    this.initDatabaseConnection();
    this.mountGlobalMiddleware();
    this.mountControllers();
    this.mountGlobalErrorHandler();
  }

  private initDatabaseConnection() {
    const devUri: string = this.env.getVariable('MONGO_DEV_URI');
    const prodUri: string = this.env.getVariable('MONGO_PROD_URI');

    const uri = this.env.isDevMode() ? devUri : prodUri;

    this.dbHandler.initDatabase({ uri });
  }

  private mountGlobalMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private mountControllers() {
    this.controllers.forEach((controller: RESTEndpointController) => {
      this.app.use('/api', controller.router);
    });
  }

  private mountGlobalErrorHandler() {
    // for errors thrown from routes
    this.app.use(routeError);
    // for routes that are not supported 
    this.app.use(routeNotFound);
  }

  public listen() {
    this.app.listen(this.env.getVariable('PORT'));
  }
}

export default JSONAPIApplication;