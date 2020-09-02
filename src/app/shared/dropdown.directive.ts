import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // This adds/removes the class "open" if true/false
  @HostBinding('class.open') private isOpen = false;

  // @HostBinding('class.open') get open() { return this.isOpen; }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
