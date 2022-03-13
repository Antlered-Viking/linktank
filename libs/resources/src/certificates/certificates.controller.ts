import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Version('1')
  @Get('status')
  async status1() {
    const check = await this.certificatesService.status();
    return { message: check };
  }

  @Version('1')
  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Version('1')
  @Get()
  findAll() {
    return this.certificatesService.findAll();
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Version('1')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto
  ) {
    return this.certificatesService.update(+id, updateCertificateDto);
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
