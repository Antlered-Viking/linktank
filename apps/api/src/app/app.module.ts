import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  LinksController,
  LinksService,
  CategoriesController,
  CategoriesService,
} from '@linktank/resources';

@Module({
  imports: [],
  controllers: [AppController, LinksController, CategoriesController],
  providers: [AppService, LinksService, CategoriesService],
})
export class AppModule {}
