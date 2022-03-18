import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LinksHealthIndicator extends HealthIndicator {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    this.prisma.$connect();
    const links = await this.prisma.link.findMany();
    this.prisma.$disconnect();
    const isHealthy = links.length > 0;
    const result = this.getStatus(key, isHealthy, {
      statusCode: links.length > 0 ? 200 : 404,
      statusText: links.length > 0 ? 'OK' : 'Not found',
      message:
        links.length > 0
          ? 'Link database contacted'
          : 'No links found in database',
      exists: links.length > 0,
      items: links.length,
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Link Service check failed', result);
  }
}
