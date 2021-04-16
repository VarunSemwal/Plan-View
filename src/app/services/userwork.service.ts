import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL:string = "http://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class UserworkService {

  constructor(private http:HttpClient) { }

  insertUserWorkDetails(userwork:any)
  {
    const URL = BASE_URL + "userwork";
    let something = this.http.post(URL,userwork);
    return something;
  }

}
