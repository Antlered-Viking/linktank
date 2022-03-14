import { Component, Input } from '@angular/core';
import { Link } from '@prisma/client';

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input()
  link: Link | undefined;
  editingURL = false;

  toggleReadStatus() {
    if (this.link) {
      this.link.isRead = !this.link?.isRead;
    }
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }
  deleteLink() {
    console.log('deleted');
  }
}
