import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
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
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${this.user.accessToken}`,
      },
    });

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        } else if (event instanceof HttpErrorResponse) {
          if (event.status === 401) {
            //TODO redirect to login
          }
        }
      })
    );
  }
}
