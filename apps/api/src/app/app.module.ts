import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import {
  LinksModule,
  CategoriesModule,
  CertificatesModule,
} from '@linktank/resources';

@Module({
  imports: [LinksModule, CategoriesModule, CertificatesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
