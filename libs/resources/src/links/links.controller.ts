import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Version,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Version('1')
  @Get('status')
  async status1() {
    const check = await this.linksService.status();
    return { message: check };
  }

  @Version('1')
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Version('1')
  // api/links?expand=metadata,tags
  @Get()
  findAll(@Query() query: { expand: string[]; filter: string }) {
    if (query.expand) {
      const metadata = query.expand.includes('metadata');
      const tags = query.expand.includes('tags');
      return this.linksService.findAll(
        metadata,
        tags,
        query.filter || undefined
      );
    }
    return this.linksService.findAll(false, false, query.filter || undefined);
  }

  @Version('1')
  // api/links?expand=metadata,tags
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: { expand: string[] }) {
    const metadata = query.expand.includes('metadata');
    const tags = query.expand.includes('tags');
    return this.linksService.findOne(id, metadata, tags);
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(id);
  }
}
