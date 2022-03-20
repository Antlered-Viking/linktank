import { CreateUserDto, SanitizedUser, UsersService } from '@linktank/users';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  async registerUser(user: CreateUserDto): Promise<SanitizedUser> {
    return await this.users.create(user);
  }

  async validateUser(name: string, pass: string): Promise<SanitizedUser> {
    const user = await this.users.findOne(name);
    if (user && user.name === name && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
    // return user;
  }

  async login(user: SanitizedUser) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
