import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription, timer} from 'rxjs';
import {NamedRoutes} from '../named-routes';
import {AppState} from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Logout} from '../auth/store/auth.actions';
import {FetchRecipes, StoreRecipes} from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  NamedRoutes = NamedRoutes;
  isLoggedIn = false;
  secondsToLogout: number;
  private userSub: Subscription;
  private timerSub: Subscription;

  constructor(private authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    // I don't see how this will ever get called anyways
    this.userSub.unsubscribe();
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(state => state.user))
      .subscribe(user => {
      this.isLoggedIn = !!user;

      if (user) {
        this.timerSub = timer(0, 1000).subscribe(() => {
          this.secondsToLogout = Math.round(user.timeUntilExpirationMS() / 1000);
        });
      }
    });


  }

  onSaveData() {
    // this.dataStorageService.storeRecipes( );
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  logout() {
    this.store.dispatch(new Logout());

    this.timerSub.unsubscribe();
    this.secondsToLogout = null;
  }
}
