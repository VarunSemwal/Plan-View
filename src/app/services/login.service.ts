import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../models/user';
const BASE_URL:string = "http://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(private http:HttpClient) {
  //   this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  //   this.currentUser = this.currentUserSubject.asObservable();
  }
  // login(useremail, password) {
    
  //   return this.http.post<any>('http://localhost:3000/login', { useremail, password })
  //   .pipe(map(user => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       return user;
  //   }));
  login(user:any)
  {
    const URL = BASE_URL + "login";
    let something = this.http.post(URL,user);
    return something;
  }

  register(user:any)
  {
    const URL = BASE_URL + "users";
    let something = this.http.post(URL,user);
    return something;
  }
}

