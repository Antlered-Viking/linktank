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
  link: Link;
  editingURL = false;

  @Output()
  linkDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.link = {
      id: '-1',
      url: 'INVALID',
      isRead: false,
      tags: [],
      notes: '',
      customData: [],
      metadataId: '-1',
    };
  }

  async ngOnInit(): Promise<void> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // if (this.link.id === '-1') {
    //   this.link = await lastValueFrom(
    //     this.http.get<Link>(
    //       `http://localhost:3333/api/v1/links/${this.route.snapshot.params['id']}?expand=metadata,tags`
    //     )
    //   );
    // }
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

  async updateTags(newTags: string[]) {
    this.link.tags = newTags;
    this.updateLink();
  }
}
