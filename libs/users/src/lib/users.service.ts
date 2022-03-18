import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
        avatarURL: '',
        role: 'user',
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(name: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { name } });
  }

  async update(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    const id = (await this.findOne(name)).id;
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        password: updateUserDto.password,
        avatarURL: updateUserDto.avatarURL,
        role: updateUserDto.role,
      },
    });
  }

  async remove(name: string): Promise<User> {
    const id = (await this.findOne(name)).id;
    return await this.prisma.user.delete({ where: { id } });
  }
}
