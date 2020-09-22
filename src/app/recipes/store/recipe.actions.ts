import {Action} from '@ngrx/store';
import {Recipe} from '../recipe';

export const SET_RECIPES = '[Recipes] SET_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export type RecipeActions = SetRecipes;
