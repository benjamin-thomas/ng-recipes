import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

// No need to export anything from a CoreModule, which should contain only services related code.
// Don't mess with providers array, except for HTTP interceptors.
// Instead, use providedIn root syntax on the service itself to make it a singleton, which is the
// recommended approach.
@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class CoreModule {
}
