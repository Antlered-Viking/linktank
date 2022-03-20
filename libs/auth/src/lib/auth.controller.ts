import { CreateUserDto, SanitizedUser } from '@linktank/users';
import { Controller, Post, Request, UseGuards, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Post('register')
  async register(@Request() req: { body: CreateUserDto }) {
    return await this.authService.registerUser(req.body);
  }

  @Version('1')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request()
    req: {
      name: string;
      password: string;
      user: SanitizedUser;
    }
  ): Promise<SanitizedUser> {
    return req.user;
  }
}
