import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {User} from './user.model';
import {AppState} from '../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1), // automatically unsubscribes
      map(state => state.user),
      exhaustMap((user: User) => { // exhaustMap will ensure the inner http observable is returned (rather than the outer user observable)
        if (!user) {
          return next.handle(req); // authenticating
        }
        return next.handle(req.clone({
          setParams: {auth: user.validToken},
        }));
      })
    );

  }

}
