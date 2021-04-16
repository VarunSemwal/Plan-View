import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserDetail} from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  lockedUsers : UserDetail[];
  count:boolean =false;
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    document.body.className = "bg";
    this.getLockedUsers();
  }

  getLockedUsers(){
    this.userService.getUser().subscribe(
      (response:UserDetail[]) => {
            this.lockedUsers=response.filter(x=>x.role==='User' && x.lockstatus==1);
            if(this.lockedUsers.length>0)
            {
              this.count=true;
            }
      },
      (error) => {
        console.log(error);
        
        
      }
    )
  }



  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('usertoken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
}

}
