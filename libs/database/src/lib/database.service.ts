import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient;
  link: Prisma.LinkDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  user: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  metadata: Prisma.MetadataDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor() {
    this.client = new PrismaClient();
    this.link = this.client.link;
    this.user = this.client.user;
    this.metadata = this.client.metadata;
  }
  onModuleInit() {
    this.client.$connect();
  }
  onModuleDestroy() {
    this.client.$disconnect();
  }
}
