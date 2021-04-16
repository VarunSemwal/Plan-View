import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {WorkService} from '../services/work.service';
import {UserService} from '../services/user.service';
import {UserworkService} from '../services/userwork.service';
import {WorkItem} from '../models/work';
import {UserDetail} from '../models/user';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userwork',
  templateUrl: './userwork.component.html',
  styleUrls: ['./userwork.component.css']
})
export class UserworkComponent implements OnInit {
  userworkform:FormGroup;
  workitem:WorkItem[]=[];
  workItemCode:[{}] = [{}];
  userEmail:string[] = [];
  submitted = false;



  /////////////

  dropdownList = [];
        disabled = false;
        ShowFilter = false;
        limitSelection = false;
        cities: Array<any> = [];
        selectedItems: Array<any> = [];
        dropdownSettings: IDropdownSettings = {};
  //////////////

  constructor(private router:Router, private fb:FormBuilder,private workservice:WorkService,private userService:UserService, private userworkservice:UserworkService) { }

  ngOnInit(): void {
    document.body.className = "bg";

    this.GetUsers();
    this.BuildUserWorkForm();

    this.getWorkItem();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    

  }

  getWorkItem(): void {
    let tmp = [];
    this.workservice.getWorkItem().subscribe((response : WorkItem[])=> {
      for(let i=0; i < response.length; i++) {
        tmp.push({ item_id: response[i].id, item_text: response[i].WorkItemCode });
      }
      this.dropdownList = tmp;
    });
  }




  BuildUserWorkForm(){
    this.userworkform = this.fb.group({
      user: ['', [Validators.required]],
      itemcodes: ['', [Validators.required]],
    })
  }
  get f() { return this.userworkform.controls; }

  GetUsers(){
    this.userService.getUser().subscribe(
      (response:UserDetail[]) => {
            let onlyUsersRole = response.filter(x=>x.role==='User');
            for(let i=0; i<onlyUsersRole.length;i++)
            {
                  this.userEmail.push(response[i].email);
            }
            console.log(this.userEmail);
          },
      (error) => {
        console.log(error);
      }
    )
  }

  onSubmit(data:any)
  {
    this.submitted = true;

    //Validating the form.
    if (this.userworkform.invalid) {
      return; 
    }
      this.userworkservice.insertUserWorkDetails(data).subscribe(
        (response)=>
        {
          alert('Assigned Successfuly')
        },
        (error)=>{
            console.log(error);
            
        }
      )
  }

  ////////////////////////////////////////////////////

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
   this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
       if (this.limitSelection) {
         this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
     } else {
         this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
     }
 }

 logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('usertoken');
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
}
  ///////////////////////////////////////////////////

}
