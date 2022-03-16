import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

import { Link, Metadata, PrismaClient } from '@prisma/client';

@Injectable()
export class LinksService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async onModuleInit() {
    this.prisma.$connect();
    const check = await this.prisma.link.findMany();
    if (check.length === 0) {
      this.seedDatabase();
    }
  }
  async onModuleDestroy() {
    this.prisma.$disconnect();
  }

  async create(createLinkDto: CreateLinkDto) {
    return await this.prisma.link.create({
      data: {
        url: createLinkDto.url,
        tags: { set: createLinkDto.tags },
        metadata: {
          create: {
            notes: '',
            customData: [],
          },
        },
      },
    });
  }

  async findAll(
    metadata: boolean,
    tags: boolean,
    tagFilter = '',
    pageNumber = 0,
    pageSize = 20,
    sort = 'asc'
  ) {
    const totalPages = Math.floor((await this.prisma.link.count()) / pageSize);
    let results: (Link & { metadata: Metadata })[];

    if (tagFilter !== '') {
      results = await this.prisma.link.findMany({
        select: {
          id: true,
          url: true,
          isRead: true,
          metadataId: true,
          metadata,
          tags,
        },
        skip: pageNumber * pageSize,
        take: pageSize,
        orderBy: {
          url: sort === 'asc' ? 'asc' : 'desc',
        },
        where: {
          tags: {
            hasSome: tagFilter,
          },
        },
      });
    } else {
      results = await this.prisma.link.findMany({
        select: {
          id: true,
          url: true,
          isRead: true,
          metadataId: true,
          metadata,
          tags,
        },
        skip: pageNumber * pageSize,
        take: pageSize,
        orderBy: {
          url: sort === 'asc' ? 'asc' : 'desc',
        },
      });
    }
    return {
      totalPages,
      hasPreviousPage: pageNumber > 0,
      hasNextPage: pageNumber < totalPages,
      sort,
      data: results,
    };
  }

  async findOne(id: string, metadata: boolean, tags: boolean) {
    return await this.prisma.link.findUnique({
      where: { id },
      select: {
        id: true,
        url: true,
        isRead: true,
        metadata,
        tags,
      },
    });
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    let result: {
      id: string;
      url: string;
      isRead: boolean;
      metadataId: string;
    };
    if (updateLinkDto.tags) {
      const curMeta = await this.prisma.metadata.findUnique({
        where: { id: updateLinkDto.metadataId },
      });
      if (
        updateLinkDto.notes !== curMeta.notes ||
        updateLinkDto.customData !== curMeta.customData
      ) {
        await this.prisma.metadata.update({
          where: { id: curMeta.id },
          data: {
            notes: updateLinkDto.notes,
            customData: updateLinkDto.customData,
          },
        });
      }
      result = await this.prisma.link.update({
        where: {
          id,
        },
        data: {
          url: updateLinkDto.url,
          isRead: updateLinkDto.isRead,
          tags: updateLinkDto.tags,
        },
      });
    }
    return result;
  }

  async remove(id: string) {
    return await this.prisma.link.delete({ where: { id } });
  }

  async seedDatabase() {
    await this.prisma.link.create({
      data: {
        url: 'https://github.com/Antlered-Viking/linktank',
        isRead: false,
        tags: { set: ['demo', 'testing'] },
        metadata: {
          create: {
            notes: 'I am a custom note field on a link!',
            customData: {
              set: [
                'User defined string',
                'As many as they like',
                'Should not be a problem!',
              ],
            },
          },
        },
      },
    });
  }
}
