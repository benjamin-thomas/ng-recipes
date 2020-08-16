import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../shared/ingredient';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(nameIn: HTMLInputElement, amountIn: HTMLInputElement) {
    const name = nameIn.value;
    const amount = parseInt(amountIn.value, 10);

    this.shoppingListService.addIngredient(new Ingredient(name, amount));
    nameIn.value = '';
    amountIn.value = '';
  }
}
