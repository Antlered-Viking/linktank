import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class LinksService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  onModuleInit() {
    this.prisma.$connect();
  }
  onModuleDestroy() {
    this.prisma.$disconnect();
  }

  async status() {
    const check = await this.prisma.link.findMany();
    return check.length > 0 ? 'OK' : 'FAIL';
  }

  async create(createLinkDto: CreateLinkDto) {
    return await this.prisma.link.create({
      data: {
        url: createLinkDto.url,
        metadata: {
          create: {
            notes: '',
            customData: [],
          },
        },
      },
    });
  }

  async findAll(metadata: boolean, tags: boolean) {
    return await this.prisma.link.findMany({ include: { metadata, tags } });
  }

  async findOne(id: string, metadata: boolean, tags: boolean) {
    return await this.prisma.link.findUnique({
      where: { id },
      include: { metadata, tags },
    });
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const cur = await this.prisma.link.findUnique({
      where: { id },
      include: { metadata: true, tags: true },
    });

    const deadTags = [];
    for (let i = 0; i < cur.tags.length; i++) {
      if (!updateLinkDto.tags.includes(cur.tags[i].label)) {
        deadTags.push({ id: cur.tags[i].id });
      }
    }
    if (deadTags.length > 0) {
      await this.prisma.tag.deleteMany({
        where: {
          OR: deadTags,
        },
      });
    }

    const curTags = [];
    for (let i = 0; i < cur.tags.length; i++) {
      curTags.push(cur.tags[i].label);
    }

    const newTags = [];
    for (let i = 0; i < updateLinkDto.tags.length; i++) {
      updateLinkDto.tags[i];
      if (!curTags.includes(updateLinkDto.tags[i])) {
        newTags.push({ label: updateLinkDto.tags[i] });
      }
    }

    const result = await this.prisma.link.create({
      data: {
        url: updateLinkDto.url || cur.url,
        isRead: updateLinkDto.isRead || cur.isRead,
        tags: {
          createMany: {
            data: newTags,
          },
        },
        metadata: {
          create: {
            notes: updateLinkDto.notes || cur.metadata.notes,
            customData: updateLinkDto.customData || cur.metadata.customData,
          },
        },
      },
    });
    return result;
  }

  async remove(id: string) {
    return await this.prisma.link.delete({ where: { id } });
  }
}
