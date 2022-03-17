import { Component, Input, OnInit } from '@angular/core';
import { CreateLinkDto, Link } from '@linktank/links';
import { LinksService } from './links.service';

@Component({
  selector: 'linktank-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  @Input()
  links: Link[];
  newLink: CreateLinkDto;

  constructor(private linksService: LinksService) {
    this.links = [];
    this.newLink = {
      url: '',
      tags: [],
    };
  }
  async ngOnInit(): Promise<void> {
    this.links = await this.linksService.getLinks();
  }
  async updateLinks(filter: string): Promise<void> {
    this.links = await this.linksService.getFilteredLinks(filter);
  }
  async createNewLink(): Promise<void> {
    await this.linksService.createLink(this.newLink);
    this.newLink.url = '';
    this.newLink.tags = [];
    this.links = await this.linksService.getLinks();
  }
}
