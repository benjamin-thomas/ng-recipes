import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {LoginStart} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // error: string = 'WIP: fake error message';
  // Will match on the first PlaceholderDirective found in the template
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  errorTextNode = document.createTextNode('');
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private cfr: ComponentFactoryResolver,
              private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    if (this.closeSub) { // in case the user somehow gets out of the componant without closing it
      this.closeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    setTimeout(() => { // schedules in macro task (otherwise ViewChild is not available yet)
      // this.showErrorAlert('WIP: bogus error message');
    });

    this.store.select('auth').subscribe(state => {
      this.isLoading = state.loading;
      this.error = state.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
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
      // authObserver = this.authService.login(email, password);
      this.store.dispatch(new LoginStart({email, password}));
    } else {
      authObserver = this.authService.signup(email, password);
    }


    // authObserver.subscribe(resp => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    //   console.log(resp);
    // }, errMessage => {
    //   this.isLoading = false;
    //   // this.error = errMessage;
    //   this.showErrorAlert(errMessage);
    // });

  }

  handleClose() {
    this.error = null;
  }

  autofill(f: NgForm) {
    f.setValue({
      email: 'user@example.com',
      password: 'pa$$w0rd'
    });
  }

  private showErrorAlert(errMessage: string) {
    // const alertCmp = new AlertComponent(); // Angular won't know about this
    const alertCmpFactory = this.cfr.resolveComponentFactory(AlertComponent);
    const vcr = this.alertHost.viewContainerRef;

    this.errorTextNode.textContent = errMessage;

    // The viewContainerRef is an object that allows interaction at the DOM level
    vcr.clear(); // ensure previous renders are cleared

    const alertCmpRef = vcr.createComponent(
      alertCmpFactory,
      0,
      undefined,
      [[this.errorTextNode]]);

    alertCmpRef.instance.type = 'warning';

    this.closeSub = alertCmpRef.instance.close
      .pipe(take(1))
      .subscribe(() => vcr.clear());
  }
}
