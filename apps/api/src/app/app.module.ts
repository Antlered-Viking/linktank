import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  LinksController,
  LinksService,
  CategoriesController,
  CategoriesService,
  CertificatesController,
  CertificatesService,
} from '@linktank/resources';

@Module({
  imports: [],
  controllers: [
    AppController,
    LinksController,
    CategoriesController,
    CertificatesController,
  ],
  providers: [AppService, LinksService, CategoriesService, CertificatesService],
})
export class AppModule {}
