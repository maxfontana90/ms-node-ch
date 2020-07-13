import { Module } from '@nestjs/common';
import { ConnectionConfig } from './provider/connection-config';
import { DatabaseConnection } from './provider/database';

@Module({
  providers: [
    {
      provide: 'CONNECTION_CONFIG',
      useValue: ConnectionConfig
    },
    DatabaseConnection,
  ],
  exports: [DatabaseConnection],
})
export class DataAccessModule {}
