import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../environments/environment';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private http = inject(HttpClient);
  private userService = inject(UsersService);
  private recipeURL = `${environment.API_URL}/recipe`;
  private recipes$: Observable<Recipe[]> = of([]);
  get Recipes$() {
    // to save in memory 
    console.log("in getLimited");
    this.recipes$ = this.http.get<Recipe[]>(`${this.recipeURL}/getLimited`);
    return this.recipes$
  }
  getRecipeById(id: number) {
    let recipe = this.http.get<Recipe>(`${this.recipeURL}/getById/${id}`);
    return recipe
  }
  searchRecipe(str: string) {
    let recipes = this.http.get<Recipe[]>(`${this.recipeURL}/search/${str}`);
    return recipes
  }
  addRecipe(r: Recipe) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.token}`);
    console.log("Attempting to add recipe:", r);
    return this.http.post<Recipe>(
      `${this.recipeURL}/addRecipe`,
      r,
      { headers }
    );
  }

  delete_Recipe(id: any) {
    console.log("in delete service");
    console.log(id);   
    //return this.http.delete<Recipe>(`${this.recipeURL}/delete/${id}`);
    // let recipe = this.http.get<Recipe>(`${this.recipeURL}/getById/66798788123794cf8ae34a84`);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.token}`);
    let recipe = this.http.delete<Recipe>(`${this.recipeURL}/delete/${id}`,{headers});
    console.log(recipe);
    
    return recipe;
  }

  // delete_Recipe(id:number){
  //   console.log(id);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.userService.token}`);
  //   let x= this.http.delete(`http://localhost:500/recipe/delete/6679791ab418357d03cfc9ae`,{headers});
  //   console.log(x);
  //   return x;
  //   // let recipe= this.http.delete<Recipe>(`${this.recipeURL}/delete/${id}`);    
  //   // return recipe
  // }
}
