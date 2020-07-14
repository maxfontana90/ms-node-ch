import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { Request, Response } from 'express';
import { AuthorService } from '../service/author.service';

@Controller('authors')
export class AuthorsController {

  constructor(
    private authorService: AuthorService,
  ) {
  }

  @ApiParam({ name: 'username', type: 'string' })
  @ApiOperation({ summary: 'Retrieve an author' })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: false,
    description: 'On success, the HTTP status code in the response header is 200',
  })
  @Get(':username')
  async getOne(
    @Req() request: Request,
    @Res() response: Response,
    @Param('username') username,
  ) {
    const authorPosts = await this
      .authorService
      // TODO Unfortunately passport-jwt doesn't support exceptions and work conditionally
      // TODO An alternative solution would be implementing a separate route to list a user's own drafts/private posts.
      // TODO Another alternative is create a custom middleware to handle this case, based on the page/scope.
      // This happens because req.user is set only when the guard is active on a given endpoint.
      .getPostsFromAuthor(username);

    if (!authorPosts) {
      return response
        .status(404)
        .json({
          statusCode: 404,
          error: 'Not Found',
          message: [`User ${username} was not found`]
        });
    }

    return response.status(200).json(authorPosts);
  }
}
