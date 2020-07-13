import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './service/database.service';
import ConnectionConfig from './provider/config';
import DatabaseConnection from './provider/connection';

@Global()
@Module({
  providers: [
    ConnectionConfig,
    DatabaseConnection,
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DataAccessModule {}
