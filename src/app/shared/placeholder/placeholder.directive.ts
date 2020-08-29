import {Directive, ViewContainerRef} from '@angular/core';

// This directive enables programmatic component instantiation
// See the AuthComponent for an example
@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
