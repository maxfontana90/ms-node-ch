import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import slug from 'limax';
import shortid from 'shortid';
import { AuthorService } from 'src/modules/authors/service/author.service';
import { JwtAuthGuard } from '../../auth/guards/jwt';
import { Author } from '../../authors/model/author.entity';

import { PostSchema } from '../model/post.schema';
import { Post as BlogPost } from '../model/post.entity';
import { PostService } from '../service/post.service';
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiParam, ApiHeader } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {

  constructor(
    private postService: PostService,
    private authorService: AuthorService,
  ) {
  }

  @ApiOperation({ summary: 'List all posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    description: 'On success, the HTTP status code in the response header is 200',
  })
  @Get()
  async list(@Res() response: Response) {
    const posts = await this.postService.list();
    response
      .status(200)
      .json(posts);
  }

  @ApiParam({ name: 'slugId', type: 'string' })
  @ApiOperation({ summary: 'Retrieve a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: false,
    description: 'On success, the HTTP status code in the response header is 200',
  })
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
        });
    }

    return response
      .status(200)
      .json(post);
  }

  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'A valid access token' })
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    isArray: false,
    description: 'On success, the HTTP status code in the response header is 201',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() post: PostSchema,
  ) {
    const user: Partial<Author> = request.user;
    const author = await this.authorService.findByUsernameOrEmail(user.username);

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
      author,
    });

    return response.status(201).json(newPost);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'slugId', type: 'string' })
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: false,
    description: 'On success, the HTTP status code in the response header is 200',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':slugId')
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Body() postUpdates: PostSchema,
    @Param('slugId') slugId,
  ) {
    const user: Partial<Author> = request.user;
    const author = await this.authorService.findByUsernameOrEmail(user.username);

    const post = await this.postService.find(slugId);
    if (!post) {
      return response
        .status(404)
        .json({
          statusCode: 404,
          error: 'Not Found',
          message: `Post with slug id ${slugId} does not exist`,
        });
    }

    if (post.author.username !== author.username) {
      return response
        .status(403)
        .json({
          statusCode: 403,
          error: 'Unauthorized',
          messages: [`User didn't authored the post`],
        });
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
    if (postUpdates.title && postUpdates.title !== post.title && post.published) {
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

  @ApiBearerAuth()
  @ApiParam({ name: 'slugId', type: 'string' })
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    isArray: false,
    description: 'On success, the HTTP status code in the response header is 204',
  })
  @ApiOperation({ summary: 'Delete a post' })
  @UseGuards(JwtAuthGuard)
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
        });
    }

    await this.postService.delete(post);
    response.status(204).send();
  }
}
