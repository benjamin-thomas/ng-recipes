import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {
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
      this.router.navigate(['/recipes']);
      console.log(resp);
      // f.reset();
    }, errMessage => {
      this.isLoading = false;
      this.error = errMessage;
    });

  }

}
