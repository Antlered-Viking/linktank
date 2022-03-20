import { CreateUserDto, SanitizedUser } from '@linktank/users';
import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Anonymous } from './anonymous.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Anonymous()
  @Post('register')
  async register(@Request() req: { body: CreateUserDto }) {
    return await this.authService.registerUser(req.body);
  }

  @Version('1')
  @Anonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request()
    req: {
      name: string;
      password: string;
      user: SanitizedUser;
    }
  ) {
    return this.authService.login(req.user);
  }

  @Version('1')
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
