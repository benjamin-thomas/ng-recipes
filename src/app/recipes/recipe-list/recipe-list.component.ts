import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('recipe')
      .pipe(map((state) => {
        return state.recipes;
      }))
      .subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
