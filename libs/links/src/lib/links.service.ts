import { DatabaseService } from '@linktank/database';
import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link, Metadata } from '@prisma/client';

@Injectable()
export class LinksService {
  constructor(private db: DatabaseService) {}

  async create(createLinkDto: CreateLinkDto) {
    return await this.db.link.create({
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
    const totalPages = Math.floor((await this.db.link.count()) / pageSize);
    let results: (Link & { metadata: Metadata })[];

    if (tagFilter !== '') {
      results = await this.db.link.findMany({
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
      results = await this.db.link.findMany({
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
    return await this.db.link.findUnique({
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
    if (updateLinkDto.tags) {
      const curMeta = await this.db.metadata.findUnique({
        where: { id: updateLinkDto.metadataId },
      });
      if (curMeta) {
        if (
          updateLinkDto.notes !== curMeta.notes ||
          updateLinkDto.customData !== curMeta.customData
        ) {
          await this.db.metadata.update({
            where: { id: curMeta.id },
            data: {
              notes: updateLinkDto.notes,
              customData: updateLinkDto.customData,
            },
          });
        }
        return await this.db.link.update({
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
    }
    throw new Error(`No link found with id ${id}`);
  }

  async remove(id: string) {
    return await this.db.link.delete({ where: { id } });
  }

  async seedDatabase() {
    await this.db.link.create({
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
