import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  avatarURL?: string;
  roles?: string[];

  constructor(
    name: string,
    password: string,
    avatarURL: string,
    roles: string[]
  ) {
    super(name, password);
    this.avatarURL = avatarURL;
    this.roles = roles;
  }
}
