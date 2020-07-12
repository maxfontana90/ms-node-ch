import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './modules/posts/controller/posts.controller';
import { AuthorsController } from './modules/authors/controller/authors.controller';

@Module({
  imports: [],
  controllers: [AppController, PostsController, AuthorsController],
  providers: [AppService],
})
export class AppModule {}
