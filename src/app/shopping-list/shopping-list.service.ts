import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  onChange = new EventEmitter<Ingredient[]>();

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
    this.onChange.emit(this._ingredients.slice());
  }
}
