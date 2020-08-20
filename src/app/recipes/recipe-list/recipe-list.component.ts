import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipeChangedSub: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnDestroy(): void {
    this.recipeChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipeChangedSub = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
