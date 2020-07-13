import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorsModule } from '../authors/authors.module';
import { AuthorService } from '../authors/service/author.service';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategies/jwt';

@Module({
  imports: [
    JwtModule.register({
      // Use a better approach for JWT Secret. Options are:
      // 1. Create a new Config Service that takes care of reading .env file based on the environment (prod, staging, dev, etc)
      // 2. Read directly from process.env.JWT_SECRET
      // 3. Hardcode it......
      secret: '1d7bc9fd3d795622cbe8e469018af848',
      signOptions: { expiresIn: '1h' },
    }),
    AuthorsModule,
  ],
  providers: [AuthorService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
