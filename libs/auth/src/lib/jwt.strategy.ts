import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tui4X8uMTy9BAd',
    });
  }

  async validate(payload: Payload) {
    // adding to this return value will add to the user object that lives in the request
    // CAUTION IS ADVISED WHEN ADDING TO THIS!
    return {
      userId: payload.sub,
      name: payload.username,
      avatarURL: payload.avatar,
      roles: payload.roles,
    };
  }
}
