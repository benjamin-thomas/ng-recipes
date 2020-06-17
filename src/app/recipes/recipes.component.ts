import {Component, OnInit} from '@angular/core';
import {RecipeService} from './recipe.service';
import {Recipe} from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
 selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
    recipeService.recipedSelected.subscribe(
      (recipe: Recipe) => this.selectedRecipe = recipe
    );
  }
  ngOnInit(): void {
  }
}
