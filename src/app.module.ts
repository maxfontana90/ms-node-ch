import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessModule } from './modules/data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
