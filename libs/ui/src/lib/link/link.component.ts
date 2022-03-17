import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  addingTag = false;
  editingTag = false;
  tagInput = '';
  editTagInput = '';

  constructor(
    private readonly http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.link = await lastValueFrom(
        this.http.get<Link>(
          `http://localhost:3333/api/v1/links/${params['id']}?expand=metadata,tags`
        )
      );
    });
  }

  async toggleReadStatus() {
    this.link.isRead = !this.link.isRead;
    this.updateLink();
  }

  toggleEditUrl() {
    this.editingURL = !this.editingURL;
  }

  toggleAddTag() {
    this.addingTag = !this.addingTag;
  }

  toggleEditTag() {
    this.editingTag = !this.editingTag;
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

  async addTag(newTag: string) {
    if (this.link.tags.includes(newTag)) {
      this.toggleAddTag();
      this.tagInput = '';
    } else {
      this.link.tags.push(newTag);
      this.updateLink();
      this.toggleAddTag();
      this.tagInput = '';
    }
  }

  async editTag(editedTag: string) {
    // TODO make this only activate the one tag
  }
}
