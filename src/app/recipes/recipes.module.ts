import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {MissingRecipeDetailComponent} from './missing-recipe-detail/missing-recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';

const components = [
  RecipesComponent,
  RecipeListComponent,
  RecipeDetailComponent,
  RecipeItemComponent,
  MissingRecipeDetailComponent,
  RecipeEditComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    RecipesRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule {
}
