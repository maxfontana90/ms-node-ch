
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use a better approach for JWT Secret. Options are:
      // 1. Create a new Config Service that takes care of reading .env file based on the environment (prod, staging, dev, etc)
      // 2. Read directly from process.env.JWT_SECRET
      // 3. Hardcode it......
      secretOrKey: '1d7bc9fd3d795622cbe8e469018af848',
    });
  }

  validate(payload: any) {
    return { ...payload };
  }
}
