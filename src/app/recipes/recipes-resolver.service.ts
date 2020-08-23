import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe';
import {DataStorageService} from '../shared/data-storage.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  private firstRun = true;

  constructor(private dataStorageService: DataStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.firstRun) {
      this.firstRun = false;
      return this.dataStorageService.fetchRecipes();
    }
  }
}
