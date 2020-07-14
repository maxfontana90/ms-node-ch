import { Controller, Get, Param, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthorService } from '../service/author.service';

@Controller('authors')
export class AuthorsController {

  constructor(
    private authorService: AuthorService,
  ) {
  }

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
    return response.status(200).json(authorPosts);
  }
}
