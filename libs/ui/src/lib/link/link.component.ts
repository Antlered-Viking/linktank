import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Link {
  id: string;
  url: string;
  isRead?: boolean;
  tags?: string[];
  notes?: string;
  customData?: string[];
  metadataId: string;
}

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input()
  link: Link = {
    id: '-1',
    url: 'INVALID',
    isRead: false,
    tags: [],
    notes: '',
    customData: [],
    metadataId: '-1',
  };
  editingURL = false;

  constructor(private readonly http: HttpClient) {}

  async toggleReadStatus() {
    this.link.isRead = !this.link.isRead;
    await this.updateLink();
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }
  async deleteLink() {
    await lastValueFrom(
      this.http.delete(`http://localhost:3333/api/v1/links/${this.link.id}`)
    );
  }

  async updateLink() {
    const update = {
      url: this.link.url,
      isRead: this.link.isRead,
    };
    this.link = await lastValueFrom(
      this.http.patch<Link>(
        `http://localhost:3333/api/v1/links/${this.link.id}`,
        update
      )
    );
  }
}
