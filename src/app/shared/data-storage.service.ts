import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
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
    return this.authService.user.pipe(
      take(1), // automatically unsubscribes
      exhaustMap(user => { // exhaustMap will ensure the inner http observable is returned (rather than the outer user observable)

        return this.http
          .get<Recipe[]>(DataStorageService.url('/recipes.json'), {
            params: new HttpParams().set('auth', user.token)
          })
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
              this.recipeService.reload(recipes);
            })
          );
      })
    );
  }

}
