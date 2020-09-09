import {User} from '../user.model';
import {AuthActions} from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case 'LOGIN':
      const p = action.payload;
      const user = new User(p.email, p.userId, p.token, p.expirationDate);
      return {
        ...state,
        user,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
