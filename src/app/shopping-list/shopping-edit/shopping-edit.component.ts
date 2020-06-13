import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../shared/ingredient';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(nameIn: HTMLInputElement, amountIn: HTMLInputElement) {
    const name = nameIn.value;
    const amount = parseInt(amountIn.value, 10);
    this.ingredientAdded.emit(new Ingredient(name, amount));
    nameIn.value = '';
    amountIn.value = '';
  }
}
