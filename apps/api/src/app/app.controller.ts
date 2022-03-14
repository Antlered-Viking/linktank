import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}
  @Version('1')
  @Get()
  welcome1() {
    return this.service.getData1();
  }
}
