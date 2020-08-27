import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {User} from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), // automatically unsubscribes
      exhaustMap((user: User) => { // exhaustMap will ensure the inner http observable is returned (rather than the outer user observable)
        if (!user) {
          return next.handle(req); // authenticating
        }
        return next.handle(req.clone({
          setParams: {auth: user.token},
        }));
      })
    );

  }

}
