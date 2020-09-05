import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {Auth2Component} from './auth2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
    Auth2Component,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AuthComponent},
      {path: '2', component: Auth2Component}, // url is now => `/auth/2`
    ])
  ],
  exports: [
    AuthComponent,
    Auth2Component,
  ]
})
export class AuthModule {
}
