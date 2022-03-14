import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '@prisma/client';

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input()
  link: Link | undefined;
  isRead: boolean | undefined;
  editingURL = false;

  @Output()
  isReadChange = new EventEmitter<boolean>();

  toggleReadStatus() {
    this.isRead = !this.isRead;
    this.isReadChange.emit(this.isRead);
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }
  deleteLink() {
    console.log('deleted');
  }
}
