import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from './roles.enum';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '@linktank/database';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.db.user.findFirst({
      where: { name: createUserDto.name },
    });
    if (exists) {
      throw new BadRequestException('Please choose another username');
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    return await this.db.user.create({
      data: {
        name: createUserDto.name,
        password,
        avatarURL: '',
        roles: [Roles.User],
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  async findOne(name: string): Promise<User> {
    return await this.db.user.findFirst({
      where: { name },
      rejectOnNotFound: true,
    });
  }

  async update(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    const id = (await this.findOne(name)).id;
    return await this.db.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        password: updateUserDto.password,
        avatarURL: updateUserDto.avatarURL,
        roles: updateUserDto.roles,
      },
    });
  }

  async remove(name: string): Promise<User> {
    const id = (await this.findOne(name)).id;
    return await this.db.user.delete({ where: { id } });
  }
}
