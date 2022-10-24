import mongoose from 'mongoose';
import { DBHandler, MongoDBCredentials } from '../util/interfaces/DBHandler';

export default class MongoDBHandler implements DBHandler {
  hasInitialized: boolean;
  connection: mongoose.Connection | undefined;

  constructor() {
    this.hasInitialized = false;
  }

  initDatabase(credentials: MongoDBCredentials): void {
    if (this.hasInitialized) return;

    const { uri } = credentials;

    mongoose.connect(uri).catch((e) => {
      console.log(e);
      process.exit(1);
    });

    this.hasInitialized = true;
    this.connection = mongoose.connection;

    this.connection.once('open', () => {
      console.log('connected to mongodb');
    });
    this.connection.once('error', () => {
      mongoose.disconnect();
    });

    // ensure that we clean up the connection when we kill the process
    process.on('SIGINT', () => {
      mongoose.disconnect();
      console.log('Mongoose disconnected on app termination. Exiting.');
      process.exit(0);
    });
  }

  // TODO (maybe)
  runQuery(...args: any[]): object | object[] {
    throw new Error('Method not implemented.');
  }
}
