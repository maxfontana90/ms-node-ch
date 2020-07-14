import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/model/author.entity';
import { Visibility } from '../types';
import { PostDetailsDto } from './post-details.dto';
import { PostSummaryDto } from './post-summary.dto';

@Entity({ name: 'post' })
export class Post {

  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column()
  public uid: string;

  @Index()
  @Column()
  public slug: string;

  @Column()
  public title: string;

  @Column()
  public body: string;

  @Column()
  public published: boolean;

  @Column()
  public visibility: Visibility;

  @ManyToOne(type => Author, author => author.username, { eager: true })
  @JoinTable()
  public author: Author;

  @Column({ nullable: true, type: 'datetime' })
  public publicationDate: Date;

  @Column({ type: 'datetime' })
  public creationDate: Date;

  public transformWithDetails(): PostDetailsDto {
    const postDto = new PostDetailsDto();
    postDto.slugid = `${this.slug}_${this.uid}`;
    postDto.title = this.title;
    postDto.content = this.body;
    postDto.isPublished = this.published;
    postDto.visibility = this.visibility;
    postDto.createdOn = this.creationDate.toISOString();
    postDto.publishedOn = this.publicationDate.toISOString();
    postDto.author = this.author.transformWithoutDetails();

    return postDto;
  }

  public transformWithoutDetails(): PostSummaryDto {
    const postDto = new PostSummaryDto();
    postDto.slugid = `${this.slug}_${this.uid}`;
    postDto.title = this.title;
    postDto.isPublished = this.published;
    postDto.visibility = this.visibility;
    postDto.createdOn = this.creationDate.toISOString();
    postDto.publishedOn = this.publicationDate.toISOString();

    return postDto;
  }
}
