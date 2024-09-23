import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel,ReactiveFormsModule  } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { UsersService } from '../../shared/services/users.service';
import { Role, User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule,JsonPipe,MatGridListModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private router = inject(Router);
  private userService = inject(UsersService);
  currentUser?: User;
  login=true

  fname: string = '';
  printFirst(m: NgModel) {
    console.log(m);
    // console.log('\\n'); // \n
  }


  onSubmit(form: NgForm) {
    this.userService.login({_id:0,userName:"",email:form.value.email,password:form.value.password,description:"",role:Role.user,recipes:[{id:0,
      name:'',
      image:''}]})
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      this.userService.connectedUser=data.user.userName;
      this.login=true;
      this.router.navigate(['/personal-area']);
    },(err)=>{console.log(err);
      this.login=false;
    })
  }
  check(form: NgForm){
    console.log("===========");
    
    console.log(form.invalid);
    console.log("===========");
    
  }
}
