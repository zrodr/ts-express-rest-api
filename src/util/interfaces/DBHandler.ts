export interface MongoDBCredentials {
  uri: string;
}

export interface MySQLDBCredentials {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface DBHandler {
  hasInitialized: boolean;
  connection: any;

  initDatabase(credentials: MongoDBCredentials | MySQLDBCredentials): void;
  runQuery(...args: any[]): object[] | object;
}