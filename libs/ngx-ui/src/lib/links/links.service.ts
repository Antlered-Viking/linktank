import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CreateLinkDto, Link } from '@linktank/links';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private readonly http: HttpClient) {}

  public async getLinks(): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(`/api/v1/links?expand=metadata,tags`)
    );
    return res.data;
  }
  public async getFilteredLinks(filter: string): Promise<Link[]> {
    const res = await lastValueFrom(
      this.http.get<{ data: Link[] }>(
        `/api/v1/links?expand=metadata,tags&filter=${filter}`
      )
    );
    return res.data;
  }
  public async createLink(createObject: CreateLinkDto): Promise<Link> {
    const res = await lastValueFrom(
      this.http.post<Link>('/api/v1/links', createObject)
    );
    return res;
  }
  public async deleteLink(id: string): Promise<Link> {
    return await lastValueFrom(this.http.delete<Link>(`/api/v1/links/${id}`));
  }
}
