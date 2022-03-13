import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  // api/links?expand=metadata,tags
  @Get()
  findAll(@Query() query: { expand: string[] }) {
    return this.linksService.findAll(
      query.expand.includes('metadata'),
      query.expand.includes('tags')
    );
  }

  // api/links?expand=metadata,tags
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: { expand: string[] }) {
    return this.linksService.findOne(
      id,
      query.expand.includes('metadata'),
      query.expand.includes('tags')
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(id);
  }
}
