import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { Author } from '../../authors/model/author.entity';
import { AuthorService } from '../../authors/service/author.service';


@Injectable()
export class AuthService {
  constructor(
    private authorService: AuthorService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username, password): Promise<Author|undefined> {
    const author = await this.authorService.findByUsernameOrEmail(username);
    if (!author) {
      return undefined;
    }
    const validUser = await bcrypt.compareSync(password, author.passwordHash);
    return validUser ? author : undefined;
  }

  async signJwt(author: Author) {
    const {
      username,
      email,
      firstName,
      lastName,
    }: Partial<Author> = author;

    const accessToken = await this
      .jwtService
      .signAsync({
        username,
        email,
        firstName,
        lastName,
      });

    return accessToken;
  }
}
