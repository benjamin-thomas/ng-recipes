import {Injectable} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
    console.log('recipe-service constructor');
  }

  // tslint:disable-next-line:variable-name
  private _recipes: Recipe[] = [];
//   private _recipes: Recipe[] = [
//
//     new Recipe(
//       'Pork ribs',
//       'Served with soy sauce and vegetables',
//       '/assets/images/pork.jpg', [
//         new Ingredient('Pork ribs', 4),
//         new Ingredient('Cherry tomatoes', 8),
//         new Ingredient('Onion', 1),
//         new Ingredient('Parsley', 1),
//         new Ingredient('Soy sauce', 1),
//       ]
//     ),
//
//     new Recipe(
//       'Burger King',
//       'A big fat burger',
//       '/assets/images/burger.jpg', [
//         new Ingredient('Buns', 2),
//         new Ingredient('Steak', 2),
//         new Ingredient('Tomato slices', 2),
//         new Ingredient('Salad', 1),
//         new Ingredient('Cheese', 1),
//         new Ingredient('Ketchup', 1),
//         new Ingredient('Mustard', 1),
//       ]
//     ),
//
//     // Dorian début
//     new Recipe(
//       'Porc au caramel',
//       'Le meilleur Porc au caramel',
//       '/assets/images/caramel.png',
//       [
//         new Ingredient('Cube porc', 10),
//         new Ingredient('Fondre du sucre (grammes)', 50),
//         new Ingredient('sauce sauja (grammes)', 50),
//         new Ingredient('Riz (1 portion)', 1),
//         new Ingredient('4 épices (grammes)', 5),
//       ]
//     ),
//     // Dorian fin
//
//     // Ewan début
//     new Recipe(
//       'Lasagnes',
//       'Lasagnes parfaites',
//       '/assets/images/lasagna.png',
//       [
//         new Ingredient('lasagne à garnir', 18),
//         new Ingredient('viande achée (gramme)', 600),
//         new Ingredient('sauce tomate (gramme)', 500),
//         new Ingredient('béchamel (gramme)', 1000),
//
//       ]
// )
//   // Ewan fin
//
// ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  find(id: number): Recipe {
    return this.recipes[id - 1];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  add(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  update(id: number, recipe: Recipe) {
    this._recipes[id - 1] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  delete(id: number) {
    this._recipes.splice((id - 1), 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  reload(recipes: Recipe[]) {
    console.log('Reloading...');
    this._recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
