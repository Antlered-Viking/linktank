import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Link {
  id: string;
  url: string;
  isRead: boolean;
  tags: string[];
  notes: string;
  customData: string[];
  metadataId: string;
}

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private readonly http: HttpClient) {}

  public async getLinks(): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(
        `http://localhost:3333/api/v1/links?expand=metadata,tags`
      )
    );
    return res.data;
  }
  public async getFilteredLinks(filter: string): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(
        `http://localhost:3333/api/v1/links?expand=metadata,tags&filter=${filter}`
      )
    );
    return res.data;
  }
  public async createLink({ url = '', tags = [] }): Promise<Link> {
    const res = await lastValueFrom(
      this.http.post<Link>('http://localhost:3333/api/v1/links', {
        url,
        tags,
      })
    );
    return res;
  }
}
