import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NamedRoutes} from './named-routes';

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},
  {
    path: NamedRoutes.Recipes.substr(1),
    // loadChildren: './recipes/recipes.module.ts#RecipesModule'}
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: NamedRoutes.Auth,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
