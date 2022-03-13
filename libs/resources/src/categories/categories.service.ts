import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
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

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
