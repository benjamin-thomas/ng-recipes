import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../recipe';
import {Ingredient} from '../../shared/ingredient';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {AddRecipe, UpdateRecipe} from '../store/recipe.actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private  router: Router,
              private store: Store<AppState>) {
  }
  id: number;
  editMode: boolean;
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    imagePath: new FormControl(null, Validators.required),
    ingredients: new FormArray([]),
  });
  ingredientsCtrl = this.form.get('ingredients') as FormArray;

  private static newIngredientFormGroup(ingredient: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        let recipe: Recipe;
        if (this.editMode) {
          // recipe = this.recipeService.find(+params.id);
          this.store.select('recipe').subscribe(state => {
            recipe = state.recipes[this.id - 1];
          });
        } else {
          recipe = new Recipe('', '', '', []);
        }
        this.initForm(recipe);
      }
    );
  }

  submit() {
    const val = this.form.value;
    const recipe = new Recipe(val.name, val.description, val.imagePath, val.ingredients);
    if (this.editMode) {
      // this.recipeService.update(this.id, recipe);
      this.store.dispatch(new UpdateRecipe({ index: this.id - 1, newRecipe: recipe}));
      this.navigateAway();
    } else {
      // this.recipeService.add(recipe);
      this.store.dispatch(new AddRecipe(recipe));

      this.store.select('recipe').pipe(
        take(1),
      ).subscribe((state) => {
        const maxID = state.recipes.length;
        this.router
          .navigate(['..', maxID], {relativeTo: this.route});
      });
    }
  }

  removeIngredient(i: number) {
    // Splicing a control array works at the UI level, but does not update the form data properly
    // Use #removeAt on the form control instead. Keeping this for ref.
    // this.ingredientsCtrl.controls.splice(i, 1); // <-- won't work
    this.ingredientsCtrl.removeAt(i);
  }

  addIngredientRow() {
    const ingredient = new Ingredient('', null);
    this.ingredientsCtrl.push(RecipeEditComponent.newIngredientFormGroup(ingredient));
  }

  cancel() {
    this.navigateAway();
  }

  private navigateAway() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  private initForm(recipe: Recipe) {
    this.form.get('name').setValue(recipe.name);
    this.form.get('description').setValue(recipe.description);
    this.form.get('imagePath').setValue(recipe.imagePath);

    recipe.ingredients.forEach((ingredient: Ingredient) => {
      this.ingredientsCtrl.push(RecipeEditComponent.newIngredientFormGroup(ingredient));
    });
  }
}
