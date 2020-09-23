import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {FetchRecipes, SET_RECIPES} from './store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  private firstRun = true;

  constructor(private store: Store<AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.firstRun) {
      this.firstRun = false;
      // return this.dataStorageService.fetchRecipes();
      this.store.dispatch(new FetchRecipes());

      return this.actions$.pipe(
        ofType(SET_RECIPES),
        take(1)
      );
    }
  }
}
