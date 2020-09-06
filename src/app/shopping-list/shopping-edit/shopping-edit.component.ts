import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  editID: number;
  private editSub: Subscription;
  private editSub2: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
    );
  }

  ngOnInit(): void {
    this.editSub2 = this.store.select('shoppingList').subscribe(state => {
      this.editID = state.editing;
      if (this.editing()) {
        const ingredient = state.ingredients[state.editing];
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    });
  }

  editing() {
    return this.editID !== -1;
  }

  submit(f: NgForm) {
    const val = f.value;
    if (this.editing()) { // careful, ID=0 returns false
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(new Ingredient(val.name, val.amount))
      );
      f.reset();
      return;
    }
    this.store.dispatch(
      new ShoppingListActions.AddIngredient(new Ingredient(val.name, val.amount))
    );
    f.reset();
  }

  deleteIngredient(editID: number) {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(editID)
    );
    this.resetForm();
  }

  resetForm() {
    this.form.resetForm();
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
    );
  }
}
