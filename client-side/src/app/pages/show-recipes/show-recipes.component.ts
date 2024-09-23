import { Component, Input, inject } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { DisplayDatePipe } from '../../shared/pipes/display-date.pipe';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RecipesService } from '../../shared/services/recipes.service';
@Component({
  selector: 'app-show-recipes',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,ShortDescriptionPipe,DisplayDatePipe,RouterModule,MatIconModule,MatButtonModule,NgIf],
  templateUrl: './show-recipes.component.html',
  styleUrl: './show-recipes.component.scss'
})
export class ShowRecipesComponent {
  private recipesService=inject(RecipesService);


  @Input()
  recipes:any[]=[];
  @Input()
  personal_area:boolean=false;
  @Input()
  deleteRecipe=(r_id:number)=>{}

  ss(id:number){
    this.recipesService.delete_Recipe(id).subscribe(date =>  console.log(date), err => console.log(err));
  }
  f(id:any){
    this.recipesService.delete_Recipe(id).subscribe(date => console.log(date), err => console.log(err))
      }
}
