import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinksModule } from '@linktank/links';
import { HealthModule } from '@linktank/health';
import { AuthModule } from '@linktank/auth';

@Module({
  imports: [HttpModule, LinksModule, HealthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
