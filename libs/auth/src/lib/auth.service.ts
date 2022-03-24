import { CreateUserDto, SanitizedUser, UsersService } from '@linktank/users';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  async registerUser(user: CreateUserDto): Promise<SanitizedUser> {
    return await this.users.create(user);
  }

  async validateUser(name: string, pass: string): Promise<SanitizedUser> {
    const user = await this.users.findOne(name);
    if (user) {
      const passMatch = await bcrypt.compare(pass, user.password);
      if (user.name === name && passMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return undefined;
    // return user;
  }

  async login(user: SanitizedUser) {
    const payload = {
      username: user.name,
      sub: user.id,
      avatar: user.avatarURL,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
