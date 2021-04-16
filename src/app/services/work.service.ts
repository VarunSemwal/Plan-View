import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WorkItem,WorkType} from '../models/work';
const BASE_URL:string = "http://localhost:4000/";


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http:HttpClient) { }

  getWorkType()
  {
    const URL = BASE_URL + "worktype";
    let something =  this.http.get(URL);
    return something;

  }
  getWorkItem()
  {
    const URL = BASE_URL + "workitem";
    let something= this.http.get(URL);
    return something;
  }

  getWorkTypeCode(code:string)
  {
    const URL = BASE_URL + "worktype?WorkTypeCode="+code;
    return this.http.get(URL);
  }

  getItemTypeCode(code:string)
  {
    const URL = BASE_URL + "workitem?WorkItemCode="+code;
    return this.http.get(URL);
  }

  getWorkItemById(id:number)
  {
    const URL = BASE_URL + "workitem/"+id;
    return this.http.get(URL);
  }
  
  insertWorkType(worktype:any)
  {
    const URL = BASE_URL + "worktype";
    let something = this.http.post(URL,worktype);
    return something;
  }
  insertWorkItem(workitem:any)
  {
    const URL = BASE_URL + "workitem";
    let something = this.http.post(URL,workitem);
    return something;
  }

}
