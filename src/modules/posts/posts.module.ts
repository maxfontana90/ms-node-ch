import { Module } from '@nestjs/common';
import { DataAccessModule } from "../data-access/data-access.module";
import { PostsController } from "./controller/posts.controller";
import { PostService } from "./service/post.service";

@Module({
  imports: [DataAccessModule],
  controllers: [PostsController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {
}
