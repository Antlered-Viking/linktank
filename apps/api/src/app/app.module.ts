import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinksController, LinksService } from '@linktank/resources';

@Module({
  imports: [],
  controllers: [AppController, LinksController],
  providers: [AppService, LinksService],
})
export class AppModule {}
