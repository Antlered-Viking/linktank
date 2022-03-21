import { LinksHealthIndicator, LinksModule } from '@linktank/links';
import { UsersHealthIndicator, UsersModule } from '@linktank/users';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CheckController } from './check.controller';

@Module({
  imports: [TerminusModule, LinksModule, UsersModule],
  controllers: [CheckController],
  providers: [LinksHealthIndicator, UsersHealthIndicator],
  exports: [],
})
export class HealthModule {}
