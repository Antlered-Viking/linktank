import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  LinksModule,
  CategoriesModule,
  CertificatesModule,
} from '@linktank/resources';

@Module({
  imports: [LinksModule, CategoriesModule, CertificatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
