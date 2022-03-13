import { Controller, Get, Version } from '@nestjs/common';

@Controller()
export class AppController {
  @Version('1')
  @Get()
  welcome1() {
    return { message: 'Welcome to the Linktank API!' };
  }
}
