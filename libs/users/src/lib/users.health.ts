import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersHealthIndicator extends HealthIndicator {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    this.prisma.$connect();
    const users = await this.prisma.user.findMany();
    this.prisma.$disconnect();
    const isHealthy = users.length > 0;
    const result = this.getStatus(key, isHealthy, { users: users.length });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('User Service check failed', result);
  }
}
