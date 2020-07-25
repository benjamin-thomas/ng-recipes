import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  onChange = new Subject<Ingredient[]>();

  constructor() {
    console.log('shopping-list-service constructor');
  }

  // tslint:disable-next-line:variable-name
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
    // return this._ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.onChange.next(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.onChange.next(this._ingredients.slice());
  }
}
