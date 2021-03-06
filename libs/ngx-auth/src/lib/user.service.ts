import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { SanitizedUser } from '@linktank/users';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user?: SanitizedUser;
  accessToken?: string;
  pin: string;
  @Output()
  authChangedEvent = new EventEmitter<SanitizedUser | undefined>();

  constructor(private http: HttpClient, private router: Router) {
    this.user = undefined;
    this.accessToken = undefined;
    this.pin = '667226'; //TODO replace hardcoded pin with user supplied pin
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
    let pass = '';
    try {
      pass = CryptoJS.AES.encrypt(
        JSON.stringify(this.accessToken),
        this.pin
      ).toString();
    } catch (e) {
      console.log(e);
    }
    localStorage.setItem('token', pass);
    this.user = await this.getProfile();
    this.authChangedEvent.emit(this.user);
    this.router.navigate(['/links']);
  }

  logout() {
    this.user = undefined;
    this.accessToken = undefined;
    this.authChangedEvent.emit(undefined);
  }

  unlockToken(pin: string) {
    let decrypted = '';
    if (this.pin) {
      try {
        this.accessToken = localStorage.getItem('token') as string;
      } catch (error) {
        throw new Error('No access token in local storage');
      }
      try {
        const bytes = CryptoJS.AES.decrypt(this.accessToken, pin);
        if (bytes.toString()) {
          decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          this.accessToken = decrypted;
          return true;
        }
      } catch (e) {
        // console.log(e);
        return false;
      }
    }
    return false;
  }

  async getProfile() {
    return await lastValueFrom(this.http.get<SanitizedUser>('/api/v1/auth/me'));
  }
}
