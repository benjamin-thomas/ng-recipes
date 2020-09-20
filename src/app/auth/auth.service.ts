import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Logout} from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
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
