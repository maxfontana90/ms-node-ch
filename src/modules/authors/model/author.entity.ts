import { Post } from 'src/modules/posts/model/post.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuthorDetailsDto } from './author-details.dto';
import { AuthorSummaryDto } from './author-summary.dto';

@Entity({ name: 'author' })
@Unique(['username'])
@Unique(['email'])
export class Author {

  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public passwordHash: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @OneToMany(type => Post, post => post.author)
  public posts: Post[];

  @Column({ type: 'datetime' })
  public joinDate: Date;

  public transformWithDetails(): AuthorDetailsDto {
    const authorDto = new AuthorDetailsDto();
    authorDto.username = this.username;
    authorDto.email = this.email;
    authorDto.firstName = this.firstName;
    authorDto.lastName = this.lastName;
    authorDto.posts = this.posts.map(post => post.transformWithoutDetails());

    return authorDto;
  }

  public transformWithoutDetails(): AuthorSummaryDto {
    const authorDto = new AuthorSummaryDto();
    authorDto.username = this.username;
    authorDto.email = this.email;
    authorDto.firstName = this.firstName;
    authorDto.lastName = this.lastName;

    return authorDto;
  }
}
