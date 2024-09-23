import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { RecipesService } from '../../shared/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { DisplayDatePipe } from '../../shared/pipes/display-date.pipe';
import { StarLevelDirective } from '../../shared/directive/star-level.directive';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [NgIf,DisplayDatePipe,StarLevelDirective],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  private service = inject(RecipesService)
  recipeId = 0;
  private activatedRoute = inject(ActivatedRoute)
  recipe?: Recipe;
  constructor() {
    this.activatedRoute.params.subscribe(r => {
      console.log(r);
      this.recipeId = r['id'];
      console.log(this.recipeId);
      this.service.getRecipeById(this.recipeId).subscribe(date => this.recipe = date, err => console.log(err))
    })
  }

}
