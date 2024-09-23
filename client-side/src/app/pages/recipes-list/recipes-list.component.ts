import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [ShowRecipesComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes: any = [];
  private router = inject(Router)
  private categoriesService = inject(CategoriesService)
  private recipeService = inject(RecipesService)
  private activatedRoute = inject(ActivatedRoute)
  categoryName = "";
  category?: Category;
  constructor() {
    this.activatedRoute.params.subscribe(r => {
      console.log(r);
      this.categoryName = r['name'];
      if (this.categoryName === 'all') {
        this.recipeService.Recipes$.subscribe(date => this.recipes = date, err => console.log(err))

      } else {
        console.log(this.categoryName);
        this.categoriesService.getCategoryByName(this.categoryName).subscribe(date => this.recipes = date.recipes, err => console.log(err))
      }
    })
  }
  ngOnInit() {

    // this.service.categories.subscribe(date =>this.recipes = date, err => console.log(err))
  }

}

