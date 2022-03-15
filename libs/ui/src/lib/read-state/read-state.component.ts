import { Component, Input } from '@angular/core';

@Component({
  selector: 'linktank-read-state',
  templateUrl: './read-state.component.html',
  styleUrls: ['./read-state.component.scss'],
})
export class ReadStateComponent {
  @Input()
  isRead = false;
}
