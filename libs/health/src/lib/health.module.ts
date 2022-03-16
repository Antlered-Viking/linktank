import { LinksHealthIndicator, LinksModule } from '@linktank/links';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CheckController } from './check.controller';

@Module({
  imports: [TerminusModule, LinksModule],
  controllers: [CheckController],
  providers: [LinksHealthIndicator],
  exports: [],
})
export class HealthModule {}
