import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinksModule, CertificatesModule } from '@linktank/resources';

@Module({
  imports: [HttpModule, TerminusModule, LinksModule, CertificatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
