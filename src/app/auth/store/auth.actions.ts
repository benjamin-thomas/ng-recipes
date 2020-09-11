import {Action} from '@ngrx/store';

export const SIGNUP_START = '[Auth] SIGNUP_START';
export const LOGIN_START = '[Auth] LOGIN_START';

export const AUTH_FAIL = '[Auth] AUTH_FAIL';
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';

export const LOGOUT = '[Auth] LOGOUT';

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string, password: string}) {
  }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string}) {
  }
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {
  }
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
  })  {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = SignupStart
  | LoginStart
  | AuthFail
  | AuthSuccess
  | Logout;
