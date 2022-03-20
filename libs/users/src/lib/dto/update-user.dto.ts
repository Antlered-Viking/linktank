import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  avatarURL?: string;
  role?: string;

  constructor(name: string, password: string, avatarURL: string, role: string) {
    super(name, password);
    this.avatarURL = avatarURL;
    this.role = role;
  }
}
