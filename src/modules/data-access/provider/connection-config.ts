import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { join } from "path";

export const ConnectionConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  // @ts-ignore
  database: join(global.appRoot + '/blog.sqlite'),
  key: 'd0c790ddff8a5ad3e10672177f8c1c74',
  entities: [
    // @ts-ignore
    global.appRoot + 'src/modules/**/*.entity.ts',
  ],
}
