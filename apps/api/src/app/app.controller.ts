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

  @Version('1')
  @Get('status')
  async status1() {
    const certificateStatus = await this.service.certificateStatus();
    const categoryStatus = await this.service.categoryStatus();
    const linksStatus = await this.service.linksStatus();
    return {
      certificates: certificateStatus,
      categories: categoryStatus,
      links: linksStatus,
    };
  }
}
