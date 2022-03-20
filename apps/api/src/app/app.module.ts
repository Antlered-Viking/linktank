import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LinksModule } from '@linktank/links';
import { HealthModule } from '@linktank/health';
import { AuthModule, RolesGuard } from '@linktank/auth';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@linktank/auth';

@Module({
  imports: [HttpModule, LinksModule, HealthModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
