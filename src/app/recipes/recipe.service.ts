import {Injectable} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {
    console.log('recipe-service constructor');
  }

  // tslint:disable-next-line:variable-name
  private _recipes: Recipe[] = [
    new Recipe(
      1,
      'Pork ribs',
      'Served with soy sauce and vegetables',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [
        new Ingredient('Pork ribs', 4),
        new Ingredient('Cherry tomatoes', 8),
        new Ingredient('Onion', 1),
        new Ingredient('Parsley', 1),
        new Ingredient('Soy sauce', 1),
      ]
    ),

    new Recipe(
      2,
      'Burger King',
      'A big fat burger',
      'data:image/jpeg;base64,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', [
        new Ingredient('Buns', 2),
        new Ingredient('Steak', 2),
        new Ingredient('Tomato slices', 2),
        new Ingredient('Salad', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Ketchup', 1),
        new Ingredient('Mustard', 1),
      ]
    ),
  ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  find(id: number): Recipe {
    return this.recipes.find(
      (recipe: Recipe) => recipe.id === id
    );
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
