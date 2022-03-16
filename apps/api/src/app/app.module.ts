import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinksModule } from '@linktank/links';
import { HealthModule } from '@linktank/health';

@Module({
  imports: [HttpModule, LinksModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
