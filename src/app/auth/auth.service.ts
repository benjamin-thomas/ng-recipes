import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {NamedRoutes} from '../named-routes';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Login, Logout} from './store/auth.actions';

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
  signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  apiKey = environment.firebaseAPIKey;

  // BehaviorSubject allows a subscriber to access the last nexted value (before the actual subscription)
  // user = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AppState>) {
  }

  private static friendlyErrorMessage(apiMessage: string) {
    let message: string;

    switch (apiMessage) {
      case 'EMAIL_EXISTS':
        console.log('email exists!!');
        message = 'Email address is taken already!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'This operation is not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.':
        message = 'Failed too many times, please wait a minute and try again';
        break;
      case 'INVALID_PASSWORD':
        message = 'Please check your password again';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Unknown email address!';
        break;
      default:
        console.log('UNEXPECTED:', apiMessage);
        message = 'Something unexpected happened!';
    }

    return message;
  }

  private static addBetterErrorMessages(err: HttpErrorResponse): string {
    let message: string;
    if (err.error && err.error.error && err.error.error.message) {
      message = AuthService.friendlyErrorMessage(err.error.error.message);
    } else {
      message = 'Unknown error!';
    }
    return message;
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.signupURL, {
        email,
        password,
        returnSecureToken: true
      }, {params: {key: this.apiKey}})
      .pipe(
        catchError(err => throwError(AuthService.addBetterErrorMessages(err))),
        tap(resp => this.handleAuth(resp))
      );
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
    // this.user.next(user);
    this.store.dispatch(new Login({
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

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.loginURL, {email, password, returnSecureToken: true}, {
        params: {key: this.apiKey}
      })
      .pipe(
        catchError(err => throwError(AuthService.addBetterErrorMessages(err))),
        tap(resp => this.handleAuth(resp))
      );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new Logout());
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
    this.router.navigate([NamedRoutes.Auth]);
  }

  private handleAuth(resp: AuthResponseData) {
    const secondsUntilExpiration: number = Number(resp.expiresIn);
    const now = new Date();
    const expiresIn = new Date(now.getTime() + secondsUntilExpiration * 1000);
    const user = new User(resp.email, resp.localId, resp.idToken, expiresIn);
    // this.user.next(user);
    this.store.dispatch(new Login({
      email: resp.email,
      token: resp.idToken,
      userId: resp.idToken,
      expirationDate: expiresIn,
    }));
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(user.timeUntilExpirationMS());
  }
}
