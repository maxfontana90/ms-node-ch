import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository, } from 'typeorm';

import { DatabaseService } from '../../data-access/service/database.service';
import { Post } from '../model/post.entity';

@Injectable()
export class PostService {
  postsRepository: Repository<Post>;

  constructor(
    private DatabaseConnection: DatabaseService,
  ) {
    this.postsRepository = DatabaseConnection
      .getConnection()
      .getRepository(Post);
  }

  async list(options?: FindManyOptions): Promise<Post[]> {
    return this.postsRepository
      .createQueryBuilder('Posts')
      .where('posts.published = true')
      .andWhere('posts.visibility = :visibility')
      .orderBy('posts.publicationDate', 'DESC')
      .setParameters({ visibility: 'public' })
      .getMany();
  }

  async find(slugId: string): Promise<Post | undefined> {
    const [slug, uid] = slugId.split('_');
    const post = await this
      .postsRepository
      .findOne({
        where: {
          slug,
          uid,
        }
      });

    return post;
  }

  async update(slugId: string, postUpdates: DeepPartial<Post>) {
    const [slug, uid] = slugId.split('_');
    const post = await this
      .postsRepository
      .findOneOrFail({
        where: {
          slug,
          uid,
        }
      });

    const updatedPost = {
      ...post,
      ...postUpdates,
    };

    return await this.postsRepository.save(updatedPost);
  }

  async create(postData: DeepPartial<Post>): Promise<Post> {
    const post = this.postsRepository.create(postData);
    await this.postsRepository.insert(post);

    return post;
  }

  async delete(post: Post): Promise<Post> {
    return await this.postsRepository.remove(post);
  }
}
