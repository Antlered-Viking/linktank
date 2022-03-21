import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Link } from '@linktank/links';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly http: HttpClient) {}

  public async getLinks(): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(
        `${environment.apiEndpoint}/links?expand=metadata,tags`
      )
    );
    return res.data;
  }
  public async getFilteredLinks(filter: string): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(
        `${environment.apiEndpoint}/links?expand=metadata,tags&filter=${filter}`
      )
    );
    return res.data;
  }
}
