export class User {
  id: string;
  name: string;
  password: string;
  avatarURL: string;
  role: string;

  constructor(
    id: string,
    name: string,
    password: string,
    avatarURL: string,
    role: string
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.avatarURL = avatarURL;
    this.role = role;
  }
}
