import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    document.body.className = "bg";
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('usertoken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}