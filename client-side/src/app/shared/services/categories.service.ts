import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private http = inject(HttpClient);
  private categoryURL = `${environment.API_URL}/category`;
  categories:Map<string, Category>;
  names:Category[]=[]
  constructor() { 
    this.categories = new Map<string, Category>();

  }

  get categoriesName() {
    // if(this.names==undefined){
    //   return of(this.names);
    // }  
    console.log("in if");
    return this.http.get<Category[]>(`${this.categoryURL}/getNames`).pipe(
      tap(res=>this.names=res));
  }
  getCategoryByName(name: string) {
    let category=this.categories.get(name)
    //if this category doesnt pull allready
    if(category!=undefined){
      return of(category);
    }
    //if this category is allready exist
    return this.http.get<Category>(`${this.categoryURL}/getByName/${name}`).pipe(
      tap(category=>this.categories.set(name,category))
    );
  }
  // addRecipe(r: Recipe) {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.token}`);
  //   console.log("Attempting to add recipe:", r);
  //   return this.http.post<Recipe>(
  //     `${this.recipeURL}/addRecipe`,
  //     r,
  //     { headers }
  //   );
  // }
}
