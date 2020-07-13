import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import bcrypt from 'bcrypt';

import { CreateAuthorDto } from '../../authors/model/author.dto.create';
import { AuthorService } from '../../authors/service/author.service';
import { CredentialsDto } from '../model/credentials.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authorService: AuthorService,
    private authService: AuthService,
  ) {
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Res() response: Response,
    @Body() credentials: CredentialsDto,
  ) {
    const author = await this.authService.validateUser(credentials.username, credentials.password);
    if (!author) {
      response
        .status(401)
        .json({
          statusCode: 401,
          error: 'Unauthorized',
          message: ['Either email/username or password is incorrect'],
        });
    }

    const accessToken = await this.authService.signJwt(author);
    response.status(200).json({ accessToken });
  }

  @Post('sign-up')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(
    @Res() response: Response,
    @Body() authorDto: CreateAuthorDto,
  ) {
    let errorMessages: string[] = [];
    const usernameInUse = await this.authorService.findByUsernameOrEmail(authorDto.username);
    if (usernameInUse) {
      errorMessages.push(`Username ${authorDto.username} is not available for use`);
    }
    const emailInUse = await this.authorService.findByUsernameOrEmail(authorDto.email);
    if (emailInUse) {
      errorMessages.push(`Email ${authorDto.email} is not available for use`);
    }

    if (errorMessages.length > 0) {
      return response.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: errorMessages,
      })
    }

    const { username, email, firstName, lastName, password } = authorDto
    const passwordHash = await bcrypt.hash(password, 10);

    const newAuthor = await this.authorService.create({
      username,
      email,
      firstName,
      lastName,
      passwordHash,
      joinDate: new Date(),
    });
    response.status(200).json(newAuthor);
  }
}
