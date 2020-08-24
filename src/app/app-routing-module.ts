import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {MissingRecipeDetailComponent} from './recipes/missing-recipe-detail/missing-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';

// https://medium.com/spacepilots/using-typescript-enums-to-make-your-angular-routes-more-type-safe-fefd95c40987
// Interesting: https://stackoverflow.com/questions/47175065/passing-type-safe-route-data-to-routes-in-angular-2
export enum NamedRoutes {
  Recipes = '/recipes',
  ShoppingList = '/shopping-list',
  Auth = 'auth',
}

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},
  {
    path: NamedRoutes.Recipes.substr(1), component: RecipesComponent, children: [
      {path: '', component: MissingRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {path: NamedRoutes.ShoppingList.substr(1), component: ShoppingListComponent},
  {path: NamedRoutes.Auth, component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
