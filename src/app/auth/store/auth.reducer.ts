import {User} from '../user.model';
import {CLEAR_ERROR, AUTH_FAIL, AUTH_SUCCESS, AuthActions, LOGIN_START, LOGOUT, SIGNUP_START} from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AUTH_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false
      };
    case AUTH_SUCCESS:
      const p = action.payload;
      const user = new User(p.email, p.userId, p.token, p.expirationDate);
      return {
        ...state,
        authError: null,
        user,
        loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    default:
      return state;
  }
}
