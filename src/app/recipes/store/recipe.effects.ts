import {Actions, Effect, ofType} from '@ngrx/effects';
import {FETCH_RECIPES, SetRecipes, STORE_RECIPES} from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipe';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(RecipeEffects.url('/recipes.json'));
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([, recipesState]) => {
      return this.http.put(
        RecipeEffects.url('/recipes.json'),
        recipesState.recipes
      );
    })
  );

  public static url(path: '/recipes.json' | '/other'): string {
    return `https://ng-recipe-course-3d7fd.firebaseio.com${path}`;
  }

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<AppState>) {
  }
}
