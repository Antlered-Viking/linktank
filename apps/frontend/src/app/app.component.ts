import { Component, OnInit } from '@angular/core';
import { Link } from '@linktank/links';
import { AppService } from './app.service';

@Component({
  selector: 'linktank-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'linktank';
  links: Link[];

  constructor(private appService: AppService) {
    this.links = [];
  }
  async ngOnInit(): Promise<void> {
    this.links = await this.appService.getLinks();
  }
  async updateLinks(filter: string): Promise<void> {
    this.links = await this.appService.getFilteredLinks(filter);
  }
}
