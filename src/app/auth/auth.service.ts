import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {AuthSuccess} from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // BehaviorSubject allows a subscriber to access the last nexted value (before the actual subscription)
  // user = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AppState>) {
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }

    const j: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userData);
    const user = new User(j.email, j.id, j._token, new Date(j._tokenExpirationDate));
    if (!user.validToken) {
      return;
    }
    console.log('Auto logging in...');
    this.autoLogout(user.timeUntilExpirationMS());
    this.store.dispatch(new AuthSuccess({
      email: j.email,
      userId: j.id,
      token: j._token,
      expirationDate: new Date(j._tokenExpirationDate),
    }));

  }

  autoLogout(expirationDurationMS: number) {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + expirationDurationMS);
    console.log('Will auto-logout at:', expiresIn);
    this.autoLogoutTimer = setTimeout(() => {
      console.log('Auto logging-out:', new Date());
      this.logout();
    }, expirationDurationMS);
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
    // this.router.navigate([NamedRoutes.Auth]);
  }

}
