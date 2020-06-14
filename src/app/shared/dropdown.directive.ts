import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') private isOpen = false;
 // @HostBinding('class.open') get open() { return this.isOpen; }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
