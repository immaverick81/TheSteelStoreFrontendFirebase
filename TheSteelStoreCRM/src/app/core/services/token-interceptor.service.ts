import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('currentUser') != null) {
      const { token } = JSON.parse(sessionStorage.getItem('currentUser'));
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request)
    .pipe(tap((event: HttpEvent<any>) => {}, (error: any) => {
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error && error.status === 400) {
          this.router.navigate(['./login']);
        }
      }
    })
    );
  }
}
