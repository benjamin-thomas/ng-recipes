import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false}) form: NgForm;
  private editSub: Subscription;
  private editID: number = null; // must initialize variable here for the UI

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

  ngOnInit(): void {
    this.editSub = this.shoppingListService.onEdit.subscribe((i: number) => {
      const ingredient = this.shoppingListService.ingredients[i];
      this.editID = i;
      this.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
    });
  }

  private editing() {
    return this.editID !== null;
  }

  submit(f: NgForm) {
    const val = f.value;
    if (this.editing()) { // careful, ID=0 returns false
      const ingredient = this.shoppingListService.ingredients[this.editID];
      ingredient.name = val.name;
      ingredient.amount = val.amount;
      this.editID = null;
      f.reset();
      return;
    }
    this.shoppingListService.addIngredient(new Ingredient(val.name, val.amount));
    f.reset();
  }

  deleteIngrerdient(editID: number) {
    this.shoppingListService.deleteIngredient(editID);
    this.resetForm();
  }

  resetForm() {
    this.form.resetForm();
    this.editID = null;
  }
}
