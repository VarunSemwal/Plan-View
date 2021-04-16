import { Component, OnInit } from '@angular/core';
import {UserDetail} from '../models/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  editProfileForm: FormGroup;
  userDetails:UserDetail[];
  submitted = false;
  roles :string[]=["User","Admin"];
  closeResult: string; 
  year:number; month:number;day:number;
  dateOfBirth : any;
  constructor(private userService:UserService,private fb: FormBuilder, private modalService: NgbModal, private router:Router) { }

  ngOnInit(): void {
    document.body.className = "bg";
    this.BuildEditForm();
    this.getUsers();
    this.setMaxDate();
    //this.BuildEditForm();
  }
  setMaxDate(){
    let date = new Date();
     this.year = date.getFullYear();
     this.month = date.getMonth()+1;
     this.day = date.getDate();
   }

   onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.dateOfBirth = year + "-" + month + "-" + day;
   }

  getUsers(){
    this.userService.getUser().subscribe(
      (response:UserDetail[]) => {
            this.userDetails=response.filter(x=>x.role==='User');
      },
      (error) => {
        console.log(error);
        
        
      }
    )
  }
  get f() { return this.editProfileForm.controls; }

  BuildEditForm(){
    this.editProfileForm = this.fb.group({
      id:[''],
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      password:['',],
      email: [{value:'',disabled:true}],
      dob : ['',[Validators.required]],
      addressLine1:[''],
      addressLine2:[''],
      city:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      state:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      country:['',[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      zipcode:[''],
      role:[''],
  });
  }
  openModal(targetModal, user:UserDetail) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password:user.password,
      dob:user.dateofbirth,
      addressLine1:user.addressLine1,
      addressLine2:user.addressLine2,
      city:user.city,
      state:user.state,
      country:user.country,
      zipcode:user.zipcode,
      id:user.id,
      role:user.role

     });
  }
  onSubmit(userData:UserDetail) {
    this.submitted = true;
    
    if (this.editProfileForm.invalid) 
    {
      //this.modalService.dismissAll();
     return; 
    }
    let rawData = this.editProfileForm.getRawValue();
    let userDetailData:UserDetail = new UserDetail();
    userDetailData.email =rawData.email;
    userDetailData.password = rawData.password;
    userDetailData.firstName = rawData.firstName;
    userDetailData.lastName = rawData.lastName;
    userDetailData.dateofbirth =rawData.dob;
    userDetailData.addressLine1 =rawData.addressLine1
    userDetailData.addressLine2 =rawData.addressLine2
    userDetailData.city = rawData.city
    userDetailData.state = rawData.state
    userDetailData.country = rawData.country
    userDetailData.zipcode = rawData.zipcode
    userDetailData.role = rawData.role
    userDetailData.lockstatus = this.userDetails.find(x=>x.id==rawData.id).lockstatus;
    userDetailData.retryCount = this.userDetails.find(x=>x.id==rawData.id).retryCount
    userDetailData.id = rawData.id
    this.userService.updateUser(userDetailData).subscribe(
      (response) => {
           alert('User Updated Succesfully');
           this.modalService.dismissAll();
           this.ngOnInit();
      },
      (error) => {
        console.log(error);
        
        
      }
    )
   }
   
   open(content, userId) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.userService.deleteUser(userId).subscribe(
          (response)=>{ 
            alert('Account Deleted Successfully');
           this.ngOnInit();
          },
          (error) => {console.log(error);}
          
        ) 
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });  
  }
  
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }
  unlockUser(user:UserDetail){
    user.retryCount=0;
    user.lockstatus=0;
    this.userService.unlockUser(user).subscribe(
      (response)=>{
        alert('Account Unlocked Successfully');
        this.ngOnInit();
        
      },
      (error)=>{console.log(error);
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