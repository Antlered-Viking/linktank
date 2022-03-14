import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { LinksHealthIndicator } from '@linktank/resources';

@Controller('status')
export class CheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private links: LinksHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('API', 'http://localhost:3333/api/v1'),
      () => this.links.isHealthy('Link Service'),
      () =>
        this.http.pingCheck(
          'Certificate Service',
          'http://localhost:3333/api/v1/certificates/status'
        ),
      () => this.http.pingCheck('Frontend', 'http://localhost:4200'),
    ]);
  }
}
