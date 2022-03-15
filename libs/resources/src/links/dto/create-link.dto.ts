export class CreateLinkDto {
  url: string;
  tags?: string[];

  constructor(url = 'INVALID', tags: string[] = []) {
    this.url = url;
    this.tags = tags;
  }
}
