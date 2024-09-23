import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user';
import { ShowRecipesComponent } from '../show-recipes/show-recipes.component';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-personal-area',
  standalone: true,
  imports: [ShowRecipesComponent,NgIf,RouterModule,MatButtonModule,MatIconModule],
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.scss'
})
export class PersonalAreaComponent implements OnInit{
  userService = inject(UsersService)
  recipeService = inject(RecipesService)
  connectedUser?:User;
  constructor() {
    console.log("constructor");

    this.userService.getConnectedUserInfo$().subscribe(data=>this.connectedUser=data, err => console.log(err));

  }
  ngOnInit(): void {
    console.log("ngOnInit");
    
    // this.connectedUser=this.userService.getConnectedUserInfo$();
  }
  onnnnn(){
    console.log(this.connectedUser);
  }
  deleteRecipe(r_id:number){
    console.log("in deleteRecipe");
    console.log(r_id);
    // console.log(this.recipeService.delete_Recipe(r_id));    

  }
log_out(){
  this.userService.token='';
  // localStorage.setItem('mytoken', '');
  this.userService.connectedUser='';
  //this.userName='';
  this.userService.connectedUserId='';
}
}
