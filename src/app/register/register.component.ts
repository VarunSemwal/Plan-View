import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserDetail} from '../models/user';
import {LoginService} from '../services/login.service';
import { ConfirmedValidator } from '../validators/confirm.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userDetail:UserDetail = new UserDetail();
  errordetail:string;
  showErrorMessage:boolean;
  year:number; month:number;day:number;
  dateOfBirth : any;


  constructor(private formBuilder: FormBuilder,
    private router: Router, private service : LoginService) { }

    
//   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
//   const password = group.get('password').value;
//   const confirmPassword = group.get('reenterpassword').value;

//   return password === confirmPassword ? null : { notSame: true }     
// }

  ngOnInit(): void {
    document.body.className = "bg";
    this.setMaxDate();
    this.registerForm = this.formBuilder.group({

      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dob : ['',[Validators.required]],
      addressLine1:[''],
      addressLine2:[''],
      city:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      state:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      country:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      zipcode:[''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      reenterpassword : ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'reenterpassword')
      });
  }
  
  setMaxDate(){
     let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth()+1;
      this.day = date.getDate();
    }

  get f() { return this.registerForm.controls; }

  setUserDetail(data:any)
  {
    this.userDetail.firstName=data["firstName"];
    this.userDetail.lastName=data["lastName"];
    this.userDetail.email=data["email"];
    this.userDetail.dateofbirth=data["dob"];
    this.userDetail.addressLine1=data["addressLine1"];
    this.userDetail.addressLine2=data["addressLine2"];
    this.userDetail.city=data["city"];
    this.userDetail.state=data["state"];
    this.userDetail.country=data["country"];
    this.userDetail.zipcode=data["zipcode"];
    this.userDetail.password= data["password"];
    this.userDetail.role = "User";
    this.userDetail.lockstatus=0;
    this.userDetail.retryCount=0;

  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.dateOfBirth = year + "-" + month + "-" + day;
   }

  OnRegister(data:any)
  {
    
    this.submitted = true;
    if (this.registerForm.invalid) {
     return; }
      
  this.setUserDetail(data);

  this.loading = true;
  this.service.register(this.userDetail).subscribe(
    (response) => {
      localStorage.setItem('usertoken', JSON.stringify(response))
      localStorage.setItem('role','User')

      this.router.navigate(['/userdashboard']);
      this.loading = false;
    },
    (error) => {
      this.errordetail = error.error;
      this.showErrorMessage = true;
      this.loading = false;
     }
  );
  
  }

}
