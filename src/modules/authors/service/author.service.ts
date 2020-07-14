import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { DatabaseService } from '../../data-access/service/database.service';
import { Author } from '../model/author.entity';

@Injectable()
export class AuthorService {
  authorRepository: Repository<Author>;

  constructor(
    private DatabaseConnection: DatabaseService,
  ) {
    this.authorRepository = DatabaseConnection
      .getConnection()
      .getRepository(Author);
  }

  async create(authorData: DeepPartial<Author>): Promise<Author> {
    const author = this.authorRepository.create(authorData);
    await this.authorRepository.insert(author);

    return author;
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<Author | undefined> {
    return await this
      .authorRepository
      .createQueryBuilder('authors')
      .where('authors.username = :usernameOrEmail OR authors.email = :usernameOrEmail')
      .setParameters({ usernameOrEmail: usernameOrEmail })
      .getOne();
  }

  async getPostsFromAuthor(username: string, includeHiddenContent: boolean = false): Promise<Author> {
    const queryBuilder = this
      .authorRepository
      .createQueryBuilder('author');

    if (includeHiddenContent) {
      queryBuilder.innerJoinAndSelect('author.posts', 'post');
    } else {
      queryBuilder.innerJoinAndSelect(
        'author.posts',
        'post',
        'post.published = :isPublished AND post.visibility = :visibility',
        { published: true, visibility: 'public' }
      );
    }

    return await queryBuilder
      .where('author.username = :username')
      .setParameters({ isPublished: true, username })
      .getOne();
  }
}
