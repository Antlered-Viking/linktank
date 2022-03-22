import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { UserService } from '../lib/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private user: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.url);
    if (req.url.includes('/api/v1/links')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.user.accessToken}`,
        },
      });
    }

    return next.handle(req).pipe(
      //FIXME deal with deprecated function call
      tap(null, (error) => {
        if (error.status === 401) {
          this.user.logout();
        }
      })
    );
  }
}
