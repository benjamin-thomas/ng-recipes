import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {LoginStart} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth2.component.html'
})
export class Auth2Component implements OnInit {
  isLoginMode = true;
  isLoading = false;
  // error: string = 'WIP: this is a fake error message!';
  error: string;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;
    let authObserver: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      // authObserver = this.authService.login(email, password);
      this.store.dispatch(new LoginStart({email, password}));
    } else {
      authObserver = this.authService.signup(email, password);
    }

    authObserver.subscribe(resp => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
      console.log(resp);
    }, errMessage => {
      this.isLoading = false;
      this.error = errMessage;
      this.form.get('password').setValue(''); // reset password only, keep email address (assume it's mostly always right)
    });

  }

  @HostListener('document:keydown.escape')
  @HostListener('document:keydown.control.c')
  handleClose() {
    console.log('Closing...');
    this.error = null;
  }

  autofill() {
    this.form.get('email').setValue('user@host.com');
    this.form.get('password').setValue('whatever');
  }
}
