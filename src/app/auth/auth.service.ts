import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from './user.model';

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
  apiKey = 'AIzaSyBEkXxgcFqQGulBwiCkxMdN1NAw5pRnPfU';
  // BehaviorSubject allows a subscriber to access the last nexted value (before the actual subscription)
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
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
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
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

  private handleAuth(resp: AuthResponseData) {
    const secondsUntilExpiration: number = Number(resp.expiresIn);
    const now = new Date();
    const expiresIn = new Date(now.getTime() + secondsUntilExpiration * 1000);
    const user = new User(resp.email, resp.localId, resp.idToken, expiresIn);
    this.user.next(user);
  }
}