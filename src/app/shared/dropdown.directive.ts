import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  showExample = false;

  // This adds/removes the class "open" if true/false
  // HostBinding describes "to which property of the hosting element we want to bind"
  // HostBinding parameter examples:
  //  - style.backgroundColor <- we are accessing the DOM property which doesn't know dashes
  //  - $1.style.backgroundColor <- minus $1 which is how you would inspect an element property after focus in chrome's devtools
  @HostBinding('class.open') private isOpen = false;

  // I think this was the course's code, which I simplified
  // @HostBinding('class.open') get open() { return this.isOpen; }

  @HostBinding('style.border') private border: string; // just an example

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;

    if (this.showExample) {
      if (this.isOpen) {
        this.border = '1px solid red';
      } else {
        this.border = null;
      }
    }
  }
}
