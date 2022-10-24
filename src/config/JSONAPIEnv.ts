import dotenv from 'dotenv';

import Env from '../util/interfaces/Env';

export default class JSONAPIEnv implements Env {
  NODE_ENV: string;
  PORT: string;
  MONGO_PROD_URI: string;
  MONGO_DEV_URI: string;

  constructor() {
    try {
      dotenv.config();

      // TODO: add custom error type for more granular debugging
      if (!process.env.NODE_ENV) {
        throw new Error(`Missing environment variable: 'NODE_ENV'`);
      }
      if (!process.env.PORT) {
        throw new Error(`Missing environment variable: 'PORT'`);
      }
      if (!process.env.MONGO_PROD_URI) {
        throw new Error(`Missing environment variable: 'MONGO_PROD_URI'`);
      }
      if (!process.env.MONGO_DEV_URI) {
        throw new Error(`Missing environment variable: 'MONGO_DEV_URI'`);
      }

      this['NODE_ENV'] = process.env.NODE_ENV;
      this['PORT'] = process.env.PORT;
      this['MONGO_PROD_URI'] = process.env.MONGO_PROD_URI;
      this['MONGO_DEV_URI'] = process.env.MONGO_DEV_URI;

      console.log(
        `Running application in ${this.NODE_ENV} mode on port ${this.PORT}.`
      );
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }

  public getVariable(
    name: 'NODE_ENV' | 'PORT' | 'MONGO_PROD_URI' | 'MONGO_DEV_URI'
  ) {
    return this[name] ? this[name] : '';
  }

  public isDevMode = (): boolean => this.NODE_ENV === 'development';
}
