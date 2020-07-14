import { Body, Controller, Delete, Get, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import slug from 'limax';
import shortid from 'shortid';

import { CreatePostDto } from '../model/post.dto.create';
import { Post as BlogPost } from '../model/post.entity';
import { PostService } from '../service/post.service';

@Controller('posts')
export class PostsController {

  constructor(
    private postService: PostService,
  ) {
  }

  @Get()
  async list(@Res() response: Response) {
    const posts = await this.postService.list();
    response
      .status(200)
      .json(posts);
  }


  @Get(':slugId')
  async getOne(
    @Res() response: Response,
    @Param('slugId') slugId,
  ) {
    const post = await this.postService.find(slugId);
    if (!post) {
      return response
        .status(404)
        .json({
          statusCode: 404,
          error: 'Not Found',
          message: `Post with slug id ${slugId} was not found`,
        })
    }

    return response
      .status(200)
      .json(post);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Res() response: Response,
    @Body() post: CreatePostDto,
  ) {
    const currentDateTime = new Date();

    const postMetadata: Partial<BlogPost> = {
      creationDate: currentDateTime,
      publicationDate: post.published ? currentDateTime : undefined,
    };

    const newPost = await this.postService.create({
      ...post,
      ...postMetadata,
      slug: slug(post.title),
      uid: shortid.generate(),
    });

    return response.status(201).json(newPost);
  }

  @Put(':slugId')
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async update(
    @Res() response: Response,
    @Body() postUpdates: CreatePostDto,
    @Param('slugId') slugId,
  ) {
    const post = await this.postService.find(slugId);
    if (!post) {
      return response
        .status(404)
        .json({
          statusCode: 404,
          error: 'Not Found',
          message: `Post with slug id ${slugId} does not exist`,
        })
    }

    const errorMessages: string[] = [];
    const updatedPostData: Partial<BlogPost> = {
      ...post,
      ...postUpdates,
    };

    if (postUpdates.published && !post.published) {
      updatedPostData.publicationDate = new Date();
    }

    if (postUpdates.published === false && post.published) {
      errorMessages.push(`Can't withdraw a post that was already published`);
    }

    // The post's title can be updated only while it is a draft.
    // After its published can't be changed because the slug could be misleading. Also permalinks shouldn't be updated.
    if(postUpdates.title && postUpdates.title !== post.title && post.published) {
      errorMessages.push(`Can't update a post's title once its already published`);
    }

    if (errorMessages.length > 0) {
      return response
        .status(400)
        .json({
          statusCode: 400,
          error: 'Bad Request',
          message: errorMessages,
        });
    }

    // Update the post's slug before saving to DB
    updatedPostData.slug = slug(postUpdates.title || post.title);
    const updatedPost = await this.postService.update(slugId, updatedPostData);

    return response
      .status(200)
      .json(updatedPost);
  }

  @Delete(':slugId')
  async delete(
    @Res() response: Response,
    @Param('slugId') slugId,
  ) {
    const post = await this.postService.find(slugId);
    if (!post) {
      return response
        .status(404)
        .json({
          statusCode: 404,
          error: 'Not Found',
          message: `Post with slug id ${slugId} does not exist`,
        })
    }

    await this.postService.delete(post);
    response.status(204).send();
  }
}
