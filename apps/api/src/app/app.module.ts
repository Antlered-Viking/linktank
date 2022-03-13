import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';

import {
  LinksModule,
  CategoriesModule,
  CertificatesModule,
} from '@linktank/resources';
import { AppService } from './links.service';

@Module({
  imports: [HttpModule, LinksModule, CategoriesModule, CertificatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
