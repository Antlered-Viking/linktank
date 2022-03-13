import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getData1(): { message: string } {
    return { message: 'Welcome to the Linktank API!' };
  }

  async certificateStatus() {
    return await lastValueFrom(
      this.http
        .get('http://localhost:3333/api/v1/certificates/status')
        .pipe(map((res) => res.data.message))
    );
  }

  async categoryStatus() {
    return await lastValueFrom(
      this.http
        .get('http://localhost:3333/api/v1/categories/status')
        .pipe(map((res) => res.data.message))
    );
  }

  async linksStatus() {
    return await lastValueFrom(
      this.http
        .get('http://localhost:3333/api/v1/links/status')
        .pipe(map((res) => res.data.message))
    );
  }
}
