import { Post } from 'src/modules/posts/model/post.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';

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
}
