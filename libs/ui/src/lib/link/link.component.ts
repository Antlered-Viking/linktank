import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

//TODO switch to entity variant without angular compiler crashing
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
  tagBeingEdited = '';

  @Output()
  linkDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (this.link.id === '-1') {
      this.link = await lastValueFrom(
        this.http.get<Link>(
          `http://localhost:3333/api/v1/links/${this.route.snapshot.params['id']}?expand=metadata,tags`
        )
      );
    }
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

  toggleEditTag(tag: string) {
    this.tagBeingEdited = tag;
    this.editingTag = !this.editingTag;
  }

  async deleteLink() {
    await lastValueFrom(
      this.http.delete(`http://localhost:3333/api/v1/links/${this.link.id}`)
    );
    this.linkDeleted.emit();
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
      if (newTag.includes(',')) {
        const tags = newTag.split(',');
        for (let i = 0; i < tags.length; i++) {
          this.link.tags.push(tags[i].trim());
        }
      } else {
        this.link.tags.push(newTag.trim());
      }
      this.updateLink();
      this.toggleAddTag();
      this.tagInput = '';
    }
  }

  async editTag(oldTag: string) {
    if (this.link.tags.includes(oldTag)) {
      const index = this.link.tags.indexOf(oldTag);
      this.link.tags[index] = this.editTagInput;
      this.updateLink();
      this.editTagInput = '';
      this.editingTag = false;
    }
  }

  async deleteTag(removedTag: string) {
    if (this.link.tags.includes(removedTag)) {
      this.link.tags = this.link.tags.filter(
        (tag: string) => tag !== removedTag
      );
      this.updateLink();
    }
  }
}
