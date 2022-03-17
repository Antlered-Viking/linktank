import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { LinksHealthIndicator } from '@linktank/links';

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
      //TODO remove next check once the UI has been created and styled
      () =>
        this.http.pingCheck('Mock Service', 'http://localhost:3333/api/v1/404'),
      () => this.http.pingCheck('Frontend', 'http://localhost:4200'),
    ]);
  }
}
