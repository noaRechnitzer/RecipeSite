import { Component, OnInit, inject } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,MatListModule, MatDividerModule,ShowRecipesComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  private recipeService = inject(RecipesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  recipes: Recipe[] = [];
  searchValue = '';

  constructor() {}

  ngOnInit(): void {
    // הקשב לשינויים בפרמטרים של ה-URL
    this.route.queryParams.subscribe(params => {
      this.searchValue = params['s'] || '';
      console.log("in queryParams"+this.searchValue);
      // this.recipeService.recipes.subscribe(
      //   data => {
      //     this.recipes = data;
      //     this.search();
      //   },
      //   err => console.log(err)
      // );
      this.recipeService.searchRecipe(this.searchValue).subscribe(
        data => {
          this.recipes = data;
        },
        err => console.log(err)
      );
    });
    console.log("searchValue:"+this.searchValue);
    

    // // קבל את רשימת המתכונים
    // this.recipeService.recipes.subscribe(
    //   data => {
    //     this.recipes = data;
    //     this.search();
    //   },
    //   err => console.log(err)
    // );
    // console.log("work??");
    
    // this.search();

  }

  // search() {
  //   let arr: Recipe[] = [];
  //   this.recipes.forEach(recipe => {
  //     if (this.isContained(this.searchValue, recipe.name)) {
  //       arr.push(recipe);
  //     }
  //   });
  //   this.recipes = [...arr];
  // }

  isContained(str1: string, str2?: string): boolean {
    if (str2) {
      return str2.includes(str1);
    }
    return false;
  }
}


// import { Component, OnChanges, OnInit, inject } from '@angular/core';
// import { RecipesService } from '../../shared/services/recipes.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Recipe } from '../../shared/models/recipe';

// @Component({
//   selector: 'app-search-results',
//   standalone: true,
//   imports: [],
//   templateUrl: './search-results.component.html',
//   styleUrl: './search-results.component.scss'
// })
// export class SearchResultsComponent implements OnInit{
//   private recipeService = inject(RecipesService);
//   private router = inject(Router);
//   private route = inject(ActivatedRoute);
//   recipes:Recipe[]=[]
//   sereachValue = ''
//   constructor(){

//   }
//   ngOnInit(): void {
//     this.recipeService.recipes.subscribe(
//       date =>{this.recipes = date;
//          this.search()}, err => console.log(err))
//   }

//   search() {
//     let arr:Recipe[]=[]
//     this.route.queryParams.subscribe(params => {
//       this.sereachValue = params['s'];
//     });
//     this.recipes.forEach(recipe => {
//       if (this.isContained(this.sereachValue, recipe.name)) {
//         arr.push(recipe)
//       }
//     });
//     this.recipes=[];
//     this.recipes=[...arr];
//   }
//   isContained(str1: string, str2?: string): boolean {
//     if (str2) {
//       return str2.includes(str1);
//     }
//     return false
//   }
// }
