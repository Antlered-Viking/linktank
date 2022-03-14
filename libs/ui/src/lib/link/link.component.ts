import { Component, Input } from '@angular/core';
import { Link } from '@prisma/client';

@Component({
  selector: 'linktank-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input()
  link: Link | undefined;
}
