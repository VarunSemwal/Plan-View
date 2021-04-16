import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserDetail} from '../models/user';
const BASE_URL:string = "http://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser()
  {
    const URL = BASE_URL + "users";
    let something = this.http.get(URL);
    return something;
  }
  updateUser(data:UserDetail)
  {
    const URL = BASE_URL+"users/"+ data.id;
    return this.http.put(URL,data);
  }

  getUserById(id:number){
    const URL = BASE_URL+"users/"+id;
    return this.http.get(URL);

  }
  getUserByEmail(mail:string){
    const URL = BASE_URL+"users?email="+mail;
    return this.http.get(URL);

  }

  deleteUser(id:number)
  {
    const URL = BASE_URL+"users/"+id;
    return this.http.delete(URL);
  }

  unlockUser(patchData:UserDetail)
  {
    const URL = `${BASE_URL}users/${patchData.id}`;
    return this.http.patch(URL,patchData);
  }

  increaseRetryCount(id:number,patchData:any){
    const URL = `${BASE_URL}users/${id}`;
    return this.http.patch(URL,patchData);
  }

}
