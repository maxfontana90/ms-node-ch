import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Visibility } from '../types';

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

  @Column({ nullable: true, type: 'datetime' })
  public publicationDate: Date;

  @Column({ type: 'datetime' })
  public creationDate: Date;
}
