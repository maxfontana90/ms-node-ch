import { Module } from '@nestjs/common';

import { AuthorsModule } from './modules/authors/authors.module';
import { DataAccessModule } from './modules/data-access/data-access.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthorsModule,
    PostsModule,
    DataAccessModule,
    AuthModule
  ],
})
export class AppModule {
}
