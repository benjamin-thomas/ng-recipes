import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedRecipe(r: Recipe) {
    this.selectedRecipe = r;
  }
}
