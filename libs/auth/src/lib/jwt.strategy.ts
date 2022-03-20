import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tui4X8uMTy9BAd',
    });
  }

  async validate(payload: any) {
    // adding to this return value will add to the user object that lives in the request
    // CAUTION IS ADVISED WHEN ADDING TO THIS!
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
