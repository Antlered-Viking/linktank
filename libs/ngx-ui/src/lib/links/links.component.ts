import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private linksService: LinksService,
    private route: ActivatedRoute
  ) {
    this.links = [];
    this.newLink = {
      url: '',
      tags: [],
    };
  }
  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParams['filter']) {
      this.updateLinks(this.route.snapshot.queryParams['filter']);
    } else {
      this.links = await this.linksService.getLinks();
    }
  }
  async updateLinks(filter: string): Promise<void> {
    this.links = await this.linksService.getFilteredLinks(filter);
  }
  async createNewLink(): Promise<void> {
    this.links.push(await this.linksService.createLink(this.newLink));
    this.newLink.url = '';
    this.newLink.tags = [];
  }
}
