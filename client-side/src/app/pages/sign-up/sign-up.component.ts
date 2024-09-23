import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel,ReactiveFormsModule  } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { UsersService } from '../../shared/services/users.service';
import { Role, User } from '../../shared/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule,JsonPipe,MatGridListModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private router = inject(Router);
  private userService = inject(UsersService);
  currentUser?: User;
  login=true
  errorM=""
  fname: string = '';
  printFirst(m: NgModel) {
    console.log(m);
    // console.log('\\n'); // \n
  }

  onSubmit(form: NgForm) {
    this.userService.signUp({userName:form.value.userName,email:form.value.email,password:form.value.password,description:form.value.description,role:Role.user,
      recipes:[{
      name:'',
      image:''}]
    })
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      this.login=true;
      this.userService.connectedUser=data.user.userName;
      this.router.navigate(['/personal-area']);
    },(err)=>{console.log(err);
      this.login=false;
      if(err.status)
        this.errorM="אימייל זה קיים כבר "
        // this.errorM=err.message
    })

  }

}
