import { Module } from '@nestjs/common';
import { DataAccessModule } from '../data-access/data-access.module';
import { AuthorsController } from './controller/authors.controller';
import { AuthorService } from './service/author.service';

@Module({
  imports: [DataAccessModule],
  controllers: [AuthorsController],
  providers: [AuthorService]
})
export class AuthorsModule {
}
