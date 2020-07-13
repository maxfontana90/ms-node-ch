import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessModule } from './modules/data-access/data-access.module';
import { PostsModule } from "./modules/posts/posts.module";

@Module({
  imports: [PostsModule, DataAccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
