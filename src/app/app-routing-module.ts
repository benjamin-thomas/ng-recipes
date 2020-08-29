import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {MissingRecipeDetailComponent} from './recipes/missing-recipe-detail/missing-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';
import {NamedRoutes} from './named-routes';
import {AuthGuard} from './auth/auth.guard';
import {Auth2Component} from './auth/auth2.component';

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},
  {
    path: NamedRoutes.Recipes.substr(1),
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: MissingRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {path: NamedRoutes.ShoppingList.substr(1), component: ShoppingListComponent},
  {path: NamedRoutes.Auth, component: AuthComponent},
  {path: 'auth2', component: Auth2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
