import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private id: number;

  constructor(private route: ActivatedRoute,
              private  router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        // this.recipe = this.recipeService.find(this.id);
        this.store.select('recipe')
          .pipe(
            map(state => {
              return state.recipes[this.id - 1];
              // return state.recipes.find((r, idx) => {
              //   return idx === this.id;
              // });
            }))
          .subscribe(recipe => {
            this.recipe = recipe;
          });
      }
    );
  }

  sendIngredientsToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  deleteRecipe() {
    // this.recipeService.delete(this.id);
    this.store.dispatch(new DeleteRecipe(this.id - 1));
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
