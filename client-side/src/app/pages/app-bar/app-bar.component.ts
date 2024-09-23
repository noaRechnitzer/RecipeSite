import { Component, NgModule, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import {MatMenuModule,MatMenu} from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, NgModel } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule ,MatIconModule,MatFormFieldModule, MatInputModule,RouterModule,MatMenuModule,NgIf,MatMenuModule,MatMenu,NgFor,FormsModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent implements OnInit,OnChanges{
  private rService = inject(RecipesService);
  private userService = inject(UsersService);
  private categoryService = inject(CategoriesService);
  private router = inject(Router);
  userName=this.userService.connectedUser;
  categoriesName:Category[]=[];
  sereachValue=''
  constructor() { 
  this.userName=this.userService.connectedUser;

  }  
  ngOnChanges(): void {
  this.userName=this.userService.connectedUser;
    
  }
  ngOnInit(): void {
    if(this.userService.token)
      {
        if(this.userService.isTokenExpired())
         {
          console.log('in isTokenExpired');
          
          this.userService.token='';
          // localStorage.setItem('mytoken', '');
          this.userService.connectedUser='';
          this.userName='';
          this.userService.connectedUserId='';
         }
      }
    this.categoryService.categoriesName.subscribe(date =>this.categoriesName = date, err => console.log(err))
  }
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(true);

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // קוד לביצוע כאשר לוחצים על ENTER
      this.router.navigate(['/search'], { queryParams: { s: this.sereachValue } });
    }
  }
  
  f(){
this.rService.delete_Recipe(7).subscribe(date => console.log(date), err => console.log(err))
  }
}
