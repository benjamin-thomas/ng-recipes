import {User} from '../user.model';
import {AuthActions} from './auth.actions';

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
    case '[Auth] LOGIN_SUCCESS':
      const p = action.payload;
      const user = new User(p.email, p.userId, p.token, p.expirationDate);
      return {
        ...state,
        authError: null,
        user,
        loading: false
      };
    case '[Auth] LOGOUT':
      return {
        ...state,
        user: null,
        loading: false
      };
    case '[Auth] LOGIN_START':
      return {
        ...state,
        authError: null,
        loading: true
      };
    case '[Auth] LOGIN_FAIL':
      return {
        ...state,
        authError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
