import {Ingredient} from '../shared/ingredient';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Oranges', 1),
  ]
};

export function shoppingListReducer(state = initialState, action) {

}
