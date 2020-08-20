import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  private id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.find(this.id);
      }
    );
  }

  sendIngredientsToShoppingList() {
    console.log('emit request', this.recipe);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.delete(this.id);
    this.router.navigate(['..'], { relativeTo: this.route});
  }
}
