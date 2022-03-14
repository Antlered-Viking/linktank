import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { LinksHealthIndicator } from './links.health';

@Module({
  controllers: [LinksController],
  providers: [LinksService, LinksHealthIndicator],
  exports: [LinksService],
})
export class LinksModule {}
