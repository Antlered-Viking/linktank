import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorReport } from '../status-error/status-error.component';
import { HealthyReport } from '../status-report/status-report.component';

interface Report {
  status: string;
  info: {
    API: HealthyReport;
    'Link Service': HealthyReport;
    Frontend: HealthyReport;
  };
  error: ErrorReport[];
  details: {
    API: HealthyReport;
    'Link Service': HealthyReport;
    Frontend: HealthyReport;
  };
}

@Component({
  selector: 'linktank-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  report?: Report;
  errors: ErrorReport[];
  constructor(private readonly http: HttpClient) {
    this.errors = [];
  }

  async ngOnInit(): Promise<void> {
    this.http.get<Report>('http://localhost:3333/api/v1/status').subscribe(
      (data) => (this.report = data),
      (error) => {
        this.report = error.error;
        for (const [key, value] of Object.entries<ErrorReport>(
          error.error.error
        )) {
          const report: ErrorReport = {
            name: key,
            message: value.message,
            status: value.status,
            statusCode: value.statusCode,
            statusText: value.statusText,
          };
          this.errors.push(report);
        }
        // console.log(this.statusReport);
      }
    );
  }
}
