export class Link {
  id: string;
  url: string;
  isRead: boolean;
  tags: string[];
  notes: string;
  customData: string[];
  metadataId: string;

  constructor() {
    this.id = '-1';
    this.url = 'INVALID';
    this.isRead = false;
    this.tags = [];
    this.notes = '';
    this.customData = [];
    this.metadataId = '-1';
  }
}
