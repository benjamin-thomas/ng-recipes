import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription, timer} from 'rxjs';
import {NamedRoutes} from '../named-routes';
import {AppState} from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

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

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
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
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    this.authService.logout();

    this.timerSub.unsubscribe();
    this.secondsToLogout = null;
  }
}
