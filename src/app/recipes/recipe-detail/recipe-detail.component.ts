import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => this.recipe = this.recipeService.find(+params.id)
    );
  }

  sendIngredientsToShoppingList() {
    console.log('emit request', this.recipe);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
