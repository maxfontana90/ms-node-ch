import { createConnection } from 'typeorm';
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

export const DatabaseConnection = {
  provide: 'DB_CONNECTION',
  useFactory: async (DBConfig: SqliteConnectionOptions) => await createConnection(DBConfig),
  inject: ['CONNECTION_CONFIG'],
};
