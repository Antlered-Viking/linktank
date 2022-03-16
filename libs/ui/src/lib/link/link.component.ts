import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Link {
  id: string;
  url: string;
  isRead: boolean;
  tags: string[];
  notes: string;
  customData: string[];
  metadataId: string;
}

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
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

  ngOnInit(): void {
    console.log(this.link);
  }

  async toggleReadStatus() {
    this.link.isRead = !this.link.isRead;
    this.updateLink();
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }
  async deleteLink() {
    await lastValueFrom(
      this.http.delete(`http://localhost:3333/api/v1/links/${this.link.id}`)
    );
  }

  async updateUrl() {
    console.log(`UPDATING ${this.link.url}`);
    if (this.editingURL) {
      this.editingURL = false;
    }
    this.updateLink();
  }

  async updateLink() {
    const update = {
      url: this.link.url,
      isRead: this.link.isRead,
      tags: this.link.tags,
      notes: this.link.notes,
      customData: this.link.customData,
      metadataId: this.link.metadataId,
    };
    this.link = await lastValueFrom(
      this.http.patch<Link>(
        `http://localhost:3333/api/v1/links/${this.link.id}`,
        update
      )
    );
  }
}
