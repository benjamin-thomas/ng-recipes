import {RouterModule, Routes} from '@angular/router';
import {NamedRoutes} from '../named-routes';
import {ShoppingListComponent} from './shopping-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: NamedRoutes.ShoppingList.substr(1), component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
