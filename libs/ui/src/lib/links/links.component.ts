import { Component, Input, OnInit } from '@angular/core';
import { LinksService } from './links.service';

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
  selector: 'linktank-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  @Input()
  links: Link[];
  newUrl = '';

  constructor(private linksService: LinksService) {
    this.links = [];
  }
  async ngOnInit(): Promise<void> {
    this.links = await this.linksService.getLinks();
  }
  async updateLinks(filter: string): Promise<void> {
    this.links = await this.linksService.getFilteredLinks(filter);
  }
  async createNewLink(): Promise<void> {
    await this.linksService.createLink({ url: this.newUrl, tags: [] });
    this.newUrl = '';
  }
}
