import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorReport } from '../status-error/status-error.component';

interface Report {
  status: string;
  info: {
    API: { status: 'up' | 'down' };
    'Link Service': { status: 'up' | 'down'; links: number };
    Frontend: { status: 'up' | 'down' };
  };
  error: ErrorReport[];
  details: {
    API: { status: 'up' | 'down' };
    'Link Service': { status: 'up' | 'down'; links: number };
    Frontend: { status: 'up' | 'down' };
  };
}

@Component({
  selector: 'linktank-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  statusReport?: Report;
  errors: ErrorReport[];
  constructor(private readonly http: HttpClient) {
    this.errors = [];
  }

  async ngOnInit(): Promise<void> {
    this.http.get<Report>('http://localhost:3333/api/v1/status').subscribe(
      (data) => (this.statusReport = data),
      (error) => {
        this.statusReport = error.error;
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
        // error.error.error.forEach((err: ErrorReport) => {
        //   this.errors.push(err);
        // });
        // console.log(this.errors);
      }
    );
  }
}
