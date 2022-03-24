import { Component, Input } from '@angular/core';

@Component({
  selector: 'linktank-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  title = '';
  @Input()
  tagline = '';
}
