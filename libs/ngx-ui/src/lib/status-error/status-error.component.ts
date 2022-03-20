import { Component, Input } from '@angular/core';

export interface ErrorReport {
  name: string;
  message: string;
  status: string;
  statusCode: number;
  statusText: string;
}

@Component({
  selector: 'linktank-status-error',
  templateUrl: './status-error.component.html',
  styleUrls: ['./status-error.component.scss'],
})
export class StatusErrorComponent {
  @Input()
  error?: ErrorReport;
}
