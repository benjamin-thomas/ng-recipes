import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentSection = 'recipes';

  registerSection(section: string) {
    this.currentSection = section;
  }
}
