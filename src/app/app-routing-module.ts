import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NamedRoutes} from './named-routes';

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
