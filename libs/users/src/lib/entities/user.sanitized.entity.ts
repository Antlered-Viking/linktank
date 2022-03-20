export class SanitizedUser {
  name: string;
  avatarURL: string;

  constructor(name: string, avatarURL: string) {
    this.name = name;
    this.avatarURL = avatarURL;
  }
}
