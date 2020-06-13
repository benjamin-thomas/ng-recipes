import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent {
  @Output() private sectionChange = new EventEmitter<string>();

  show(section: string) {
    this.sectionChange.emit(section);
  }
}
