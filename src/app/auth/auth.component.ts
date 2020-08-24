import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const email = f.value.email;
    const password = f.value.password;
    this.isLoading = true;
    let authObserver: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObserver = this.authService.login(email, password);
    } else {
      authObserver = this.authService.signup(email, password);
    }

    authObserver.subscribe(resp => {
      this.isLoading = false;
      console.log(resp);
      // f.reset();
    }, errMessage => {
      this.isLoading = false;
      this.error = errMessage;
    });

  }

}
