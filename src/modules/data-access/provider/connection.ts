import { createConnection, Connection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

async function DatabaseConnection(DBConfig: SqliteConnectionOptions): Promise<Connection> {
  return await createConnection(DBConfig);
}

export default {
  provide: 'DB_CONNECTION',
  useFactory: DatabaseConnection,
  inject: ['CONNECTION_CONFIG'],
};
