import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {SetRecipes} from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<AppState>) {
  }

  private static url(path: '/recipes.json' | '/other'): string {
    return `https://ng-recipe-course-3d7fd.firebaseio.com${path}`;
  }

  storeRecipes() {
    const recipes = this.recipeService.recipes;
    this.http
      .put(DataStorageService.url('/recipes.json'), recipes)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  fetchRecipes() {
    console.log('Fetching recipes...');

    return this.http
      .get<Recipe[]>(DataStorageService.url('/recipes.json'))
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            if (recipe.ingredients === undefined) {
              recipe.ingredients = [];
            }
            return recipe;
          });
        }),
        tap(recipes => {
          // this.recipeService.reload(recipes);
          this.store.dispatch(new SetRecipes(recipes));
        })
      );
  }

}
