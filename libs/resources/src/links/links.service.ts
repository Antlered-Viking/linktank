import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

import { Link, Metadata, PrismaClient, Tag } from '@prisma/client';

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
    const inTags = createLinkDto.tags;
    const tags = [];
    const added: string[] = [];
    if (inTags.length > 0) {
      for (let i = 0; i < inTags.length; i++) {
        tags.push({
          label: inTags[i],
        });
      }
    }
    const oldTags = await this.prisma.tag.findMany({
      where: {
        OR: tags,
      },
    });
    for (let i = 0; i < oldTags.length; i++) {
      added.push(oldTags[i].label);
    }

    const tagConnector = [];
    for (let i = 0; i < oldTags.length; i++) {
      tagConnector.push({ id: oldTags[i].id });
    }

    const unAdded = inTags.filter((tag) => {
      !added.includes(tag);
    });
    const newTags = [];
    for (let i = 0; i < unAdded.length; i++) {
      newTags.push({ label: unAdded[i] });
    }

    return await this.prisma.link.create({
      data: {
        url: createLinkDto.url,
        tags: {
          connect: tagConnector,
          createMany: {
            data: newTags,
          },
        },
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
    const totalPages = Math.max(
      +1,
      Math.floor((await this.prisma.link.count()) / pageSize)
    );
    let results: (Link & { tags: Tag[]; metadata: Metadata })[];

    if (tagFilter !== '') {
      results = await this.prisma.link.findMany({
        include: { metadata, tags },
        skip: pageNumber * pageSize,
        take: pageSize,
        orderBy: {
          url: sort === 'asc' ? 'asc' : 'desc',
        },
        where: {
          tags: {
            some: {
              label: tagFilter,
            },
          },
        },
      });
    } else {
      results = await this.prisma.link.findMany({
        include: { metadata, tags },
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
      include: { metadata, tags },
    });
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const cur = await this.prisma.link.findUnique({
      where: { id },
      include: { metadata: true, tags: true },
    });
    let result: {
      id: string;
      url: string;
      isRead: boolean;
      metadataId: string;
    };

    if (updateLinkDto.tags) {
      const deadTags = [];
      let tagLength = 0;
      if (cur.tags) {
        tagLength = cur.tags.length;
      }
      for (let i = 0; i < tagLength; i++) {
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

      result = await this.prisma.link.update({
        where: {
          id,
        },
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
    } else {
      result = await this.prisma.link.update({
        where: {
          id,
        },
        data: {
          url: updateLinkDto.url || cur.url,
          isRead: updateLinkDto.isRead || cur.isRead,
          metadata: {
            create: {
              notes: updateLinkDto.notes || cur.metadata.notes,
              customData: updateLinkDto.customData || cur.metadata.customData,
            },
          },
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
        tags: {
          createMany: {
            data: [{ label: 'demo' }, { label: 'testing' }],
          },
        },
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
