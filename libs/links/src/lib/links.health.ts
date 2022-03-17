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
    const result = this.getStatus(key, isHealthy, { links: links.length });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Link Service check failed', result);
  }
}
