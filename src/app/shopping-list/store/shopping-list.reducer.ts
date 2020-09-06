import {Ingredient} from '../../shared/ingredient';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editing: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Oranges', 1),
  ],
  editing: -1,
};

export function shoppingListReducer(state: State = initialState,
                                    action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload,
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload,
        ]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientsAfterUpdate = [...state.ingredients];
      ingredientsAfterUpdate[state.editing] = action.payload;

      return {
        ...state,
        ingredients: ingredientsAfterUpdate,
        editing: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredientsAfterDelete = [...state.ingredients];
      ingredientsAfterDelete.splice(state.editing, 1);

      return {
        ...state,
        ingredients: ingredientsAfterDelete,
        editing: -1
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editing: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editing: -1,
      };
    default:
      return state;
  }
}
