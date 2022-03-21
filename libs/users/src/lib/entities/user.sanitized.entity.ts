export class SanitizedUser {
  id: string;
  name: string;
  avatarURL: string;
  roles: string[];

  constructor(id: string, name: string, avatarURL: string, roles: string[]) {
    this.id = id;
    this.name = name;
    this.avatarURL = avatarURL;
    this.roles = roles;
  }
}
