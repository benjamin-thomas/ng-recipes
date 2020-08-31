import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {NamedRoutes} from './named-routes';
import {Auth2Component} from './auth/auth2.component';

const routes: Routes = [
  {path: '', redirectTo: NamedRoutes.Recipes, pathMatch: 'full'},

  {path: NamedRoutes.Auth, component: AuthComponent},
  {path: 'auth2', component: Auth2Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
