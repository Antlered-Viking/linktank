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
    const result = this.getStatus(key, isHealthy, {
      statusCode: users.length > 0 ? 200 : 404,
      statusText: users.length > 0 ? 'OK' : 'Not found',
      message:
        users.length > 0
          ? 'User database contacted'
          : 'No users found in database',
      exists: users.length > 0,
      items: users.length,
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('User Service check failed', result);
  }
}
