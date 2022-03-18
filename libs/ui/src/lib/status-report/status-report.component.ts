import { Component, Input } from '@angular/core';

export interface HealthyReport {
  status: 'up' | 'down';
  exists?: boolean;
  items?: number;
}

@Component({
  selector: 'linktank-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss'],
})
export class StatusReportComponent {
  @Input()
  name?: string;
  @Input()
  report?: HealthyReport;
}
