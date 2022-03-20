export class SanitizedUser {
  id: string;
  name: string;
  avatarURL: string;

  constructor(id: string, name: string, avatarURL: string) {
    this.id = id;
    this.name = name;
    this.avatarURL = avatarURL;
  }
}
