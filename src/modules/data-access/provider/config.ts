import { join } from "path";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const ConnectionConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  // @ts-ignore
  database: join(global.appRoot + '/blog.sqlite'),
  key: 'd0c790ddff8a5ad3e10672177f8c1c74',
  synchronize: true,
  entities: [
    __dirname + '../../../**/*.entity{.ts,.js}',
  ],
}

export default {
  provide: 'CONNECTION_CONFIG',
  useValue: ConnectionConfig
};
