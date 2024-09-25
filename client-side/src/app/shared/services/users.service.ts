import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Observable, Observer, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  constructor() { }


  private usersURL = `${environment.API_URL}/user`;

  private connectedUserInfo$: any = new Object("ll");


  public get token(): string | null {
    return localStorage.getItem('mytoken');
  }

  public set token(token: string) {
    // if (token) {
    //   localStorage.setItem('mytoken', token);
    // }
    console.log('in set token');
    localStorage.setItem('mytoken', token);
  }
  public get connectedUser(): string | null {
    return localStorage.getItem('connectedUser');
  }

  public set connectedUser(user: string) {
    // if (user) {
    //   localStorage.setItem('connectedUser', user);
    // }
    localStorage.setItem('connectedUser', user);

  }
  public get connectedUserId(): string | null {
    return localStorage.getItem('connectedUserId');
  }

  public set connectedUserId(user: string) {
    // if (user) {
    //   localStorage.setItem('connectedUserId', user);
    // }
    localStorage.setItem('connectedUserId', user);

  }

  login(u: User) {
    return this.http.post<{ user: User; token: string }>(
      `${this.usersURL}/signIn`,
      u
    ).pipe(tap(data => {
      this.connectedUserInfo$ = data.user;
      this.connectedUser = data.user.userName;
      this.connectedUserId = data.user._id + '';
    }));
  }
  signUp(u: User) {
    return this.http.post<{ user: User; token: string }>(
      `${this.usersURL}/signUp`,
      u
    ).pipe(tap(data => this.connectedUserInfo$ = data.user));
  }
  isTokenExpired() {
    const expiry = (JSON.parse(atob(String(this.token).split('.')[1]))).exp;
    console.log('is token expired =', (Math.floor((new Date).getTime() / 1000)) >= expiry);
    return (Math.floor((new Date).getTime() / 1000)) >= expiry
  }
  public getConnectedUserInfo$() {
    // if (condition) {
    //   crvcr
    // }
    // if (this.connectedUserInfo$==undefined) {
    console.log("getConnectedUserInfo");
    // try {
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<User>(
      `${this.usersURL}/getById/${this.connectedUserId}`,{headers})
    // `${this.usersURL}/getById/${this.connectedUserId}`,
    // .pipe(tap(data => {
    //   console.log(data);
    //   this.connectedUserInfo$ = {...data}
    //   this.connectedUser = data.userName;
    //   // this.connectedUserId = data.user._id + '';
    // }));
    // } catch (error) {
    //   console.log(error);
    //   return of(error)
  }

  // }
  // return this.connectedUserInfo$;


}
