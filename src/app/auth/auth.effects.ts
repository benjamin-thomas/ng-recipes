import {Actions, Effect, ofType} from '@ngrx/effects';
import {AUTH_SUCCESS, AuthFail, AuthSuccess, LOGIN_START, LoginStart, SIGNUP_START, SignupStart} from './store/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthResponseData} from './auth.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NamedRoutes} from '../named-routes';

@Injectable()
export class AuthEffects {
  signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  apiKey = environment.firebaseAPIKey;

  @Effect()
  signupStart = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap((action: SignupStart) => {
      const p = action.payload;
      return this.handleAuth(p.email, p.password, this.signupURL);
    })
  );

  @Effect()
  loginStart = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((action: LoginStart) => {
      const p = action.payload;
      return this.handleAuth(p.email, p.password, this.loginURL);
    }),
  );


  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(ofType(AUTH_SUCCESS), tap(() => {
    this.router.navigate([NamedRoutes.Recipes]);
  }));


  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }

  private static addBetterErrorMessages(err: HttpErrorResponse): string {
    let message: string;
    if (err.error && err.error.error && err.error.error.message) {
      message = AuthEffects.friendlyErrorMessage(err.error.error.message);
    } else {
      message = 'Unknown error!';
    }
    return message;
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

  private handleAuth(email: string, password: string, url: string) {
    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken: true
      }, {params: {key: this.apiKey}})
      .pipe(
        map(resp => {
          const secondsUntilExpiration: number = Number(resp.expiresIn);
          const now = new Date();
          const expiresIn = new Date(now.getTime() + secondsUntilExpiration * 1000);
          return new AuthSuccess({
            email: resp.email,
            userId: resp.localId,
            token: resp.idToken,
            expirationDate: expiresIn,
          });
        }),
        catchError(err => {
          return of(new AuthFail(
            AuthEffects.addBetterErrorMessages(err)
          ));
        })
      );
  }

}
