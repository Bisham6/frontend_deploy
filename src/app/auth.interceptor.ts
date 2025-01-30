import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if(token){
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(cloned);
    }else {
      return next.handle(request)
    }
  }
}
// after this you have to add this interceptor in app.module.ts file
