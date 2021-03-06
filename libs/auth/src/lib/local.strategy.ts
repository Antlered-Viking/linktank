import { SanitizedUser } from '@linktank/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    name: string,
    pass: string,
    user?: SanitizedUser
  ): Promise<SanitizedUser> {
    // anything that is to be added to the JWT payload (see jwt.strategy.ts)
    // must be supplied to this validateUser call
    const u = await this.authService.validateUser(name, pass);
    if (u === undefined) {
      throw new UnauthorizedException();
    }
    user = u;
    return user;
  }
}
