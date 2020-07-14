import { Module } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { AuthorService } from '../authors/service/author.service';
import { DataAccessModule } from "../data-access/data-access.module";
import { PostsController } from "./controller/posts.controller";
import { PostService } from "./service/post.service";

@Module({
  imports: [DataAccessModule, AuthorsModule],
  controllers: [PostsController],
  providers: [PostService, AuthorService],
  exports: [PostService],
})
export class PostsModule {
}
