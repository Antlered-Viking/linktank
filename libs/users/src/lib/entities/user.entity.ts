export class User {
  id: string;
  name: string;
  password: string;
  avatarURL: string;
  roles: string[];

  constructor(
    id: string,
    name: string,
    password: string,
    avatarURL: string,
    roles: string[]
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.avatarURL = avatarURL;
    this.roles = roles;
  }
}
