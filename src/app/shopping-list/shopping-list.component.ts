import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private sub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.sub = this.shoppingListService.onChange.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  editItem(i: number) {
    this.shoppingListService.onEdit.next(i);
  }
}
