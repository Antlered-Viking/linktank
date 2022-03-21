import { Anonymous, Roles } from '@linktank/auth';
import { Roles as RolesEnum } from '@linktank/users';
import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Version('1')
  @Anonymous()
  @Get()
  welcome1() {
    return this.service.getData1();
  }

  @Version('1')
  @Roles(RolesEnum.Admin)
  @Get('admin')
  admin() {
    return { message: 'Admin status verified!' };
  }

  @Version('1')
  @Roles(RolesEnum.User)
  @Get('user')
  user() {
    return { message: 'User status verified!' };
  }
}
