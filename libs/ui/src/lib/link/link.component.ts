import { Component, Input } from '@angular/core';
import { Link } from '@prisma/client';

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input()
  link: Link;
  editingURL = false;

  constructor() {
    this.link = { id: '-1', url: 'INVALID', isRead: false, metadataId: '-1' };
  }

  toggleReadStatus() {
    this.link.isRead = !this.link.isRead;
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }
  deleteLink() {
    console.log('deleted');
  }
}
