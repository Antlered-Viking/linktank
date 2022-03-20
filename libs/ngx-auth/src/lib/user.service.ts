import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SanitizedUser } from '@linktank/users';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: SanitizedUser;
  accessToken?: string;

  constructor(private http: HttpClient) {
    this.user = undefined;
    this.accessToken = undefined;
  }

  async register(name: string, password: string) {
    await lastValueFrom(
      this.http.post('/api/v1/auth/register', {
        username: name,
        password: password,
      })
    );
    await this.login(name, password);
  }

  async login(name: string, password: string) {
    const res = await lastValueFrom(
      this.http.post<{ access_token: string }>('/api/v1/auth/login', {
        username: name,
        password: password,
      })
    );
    this.accessToken = res.access_token;
  }

  logout() {
    this.user = undefined;
    this.accessToken = undefined;
  }
}
