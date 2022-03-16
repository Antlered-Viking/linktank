import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
// import { Link } from '@prisma/client'; //TODO replace this with an internal type
import { environment } from '../environments/environment';

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
}
