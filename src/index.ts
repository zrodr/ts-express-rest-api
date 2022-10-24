import JSONAPIApplication from './app';

import JSONAPIEnv from './config/JSONAPIEnv';
import MongoDBHandler from './config/MongoDBHandler';

import UserController from './resources/user/user-controller';

const app: JSONAPIApplication = new JSONAPIApplication(
  new JSONAPIEnv(),
  new MongoDBHandler(),
  [new UserController()]
);

app.listen();
