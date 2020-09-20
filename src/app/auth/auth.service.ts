import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Logout} from './store/auth.actions';

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

  constructor(private store: Store<AppState>) {
  }

  setLogoutTimer(expirationDurationMS: number) {
    const now = new Date();
    const expiresIn = new Date(now.getTime() + expirationDurationMS);
    console.log('Will auto-logout at:', expiresIn);
    this.autoLogoutTimer = setTimeout(() => {
      console.log('Auto logging-out:', new Date());
      this.store.dispatch(new Logout());
    }, expirationDurationMS);
  }

  clearLogoutTimer() {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
  }

}
