import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {MissingRecipeDetailComponent} from './recipes/missing-recipe-detail/missing-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

// https://medium.com/spacepilots/using-typescript-enums-to-make-your-angular-routes-more-type-safe-fefd95c40987
// Interesting: https://stackoverflow.com/questions/47175065/passing-type-safe-route-data-to-routes-in-angular-2
export enum NamedRoutes {
  Recipes = '/recipes',
  ShoppingList = '/shopping-list',
}

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},
  {
    path: NamedRoutes.Recipes.substr(1), component: RecipesComponent, children: [
      {path: '', component: MissingRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: NamedRoutes.ShoppingList.substr(1), component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
