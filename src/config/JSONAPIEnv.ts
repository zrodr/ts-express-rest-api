import dotenv from 'dotenv';

import Env from '../util/interfaces/Env';
import EnvConfigError from '../util/error/EnvConfigError';

type JSONAPIEnvVariables =
  | 'NODE_ENV'
  | 'PORT'
  | 'MONGO_PROD_URI'
  | 'MONGO_DEV_URI';

export default class JSONAPIEnv implements Env {
  NODE_ENV: string;
  PORT: string;
  MONGO_PROD_URI: string;
  MONGO_DEV_URI: string;

  constructor() {
    try {
      dotenv.config();
      const missingVariables: string[] = [];

      // workaround for definite assignment in constructor ts error
      this.NODE_ENV = '';
      this.PORT = '';
      this.MONGO_PROD_URI = '';
      this.MONGO_DEV_URI = '';

      // check to see that all variables exist. If one of them is undefined,
      // project will error and terminate early.
      process.env.NODE_ENV
        ? (this.NODE_ENV = process.env.NODE_ENV)
        : missingVariables.push('NODE_ENV');

      process.env.PORT
        ? (this.PORT = process.env.PORT)
        : missingVariables.push('PORT');

      process.env.MONGO_PROD_URI
        ? (this.MONGO_PROD_URI = process.env.MONGO_PROD_URI)
        : missingVariables.push('MONGO_PROD_URI');

      process.env.MONGO_DEV_URI
        ? (this.MONGO_DEV_URI = process.env.MONGO_DEV_URI)
        : missingVariables.push('MONGO_DEV_URI');

      if (missingVariables.length) {
        throw new EnvConfigError(missingVariables);
      }

      console.log(
        `Running application in ${this.NODE_ENV} mode on port ${this.PORT}.`
      );
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }

  public getVariable(name: JSONAPIEnvVariables) {
    return this[name];
  }

  public isDevMode = (): boolean => this.NODE_ENV === 'development';
}
