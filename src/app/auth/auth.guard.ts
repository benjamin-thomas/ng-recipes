import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {NamedRoutes} from '../named-routes';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth')
      .pipe(
        take(1), // do not subscribe and leak memory
        map(state => state.user),
        map(user => {
          const authenticated = !!user;
          if (authenticated) {
            return true;
          }

          // redirect to /auth
          return this.router.createUrlTree([NamedRoutes.Auth]);
        }));
  }

}
