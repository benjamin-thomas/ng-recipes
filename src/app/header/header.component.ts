import {Component} from '@angular/core';
import {NamedRoutes} from '../app-routing-module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent {
  NamedRoutes = NamedRoutes;
}
