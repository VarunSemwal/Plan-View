import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';
import { UserDetail} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    showErrorMessage = false;
    errordetail:string;
    retryCount:number;
    lockStatus:number;

  constructor(private formBuilder : FormBuilder, private userService:UserService,private service : LoginService,private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    document.body.className = "bg";
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(data : any) {
    this.submitted = true;

    //Validating the form.
    if (this.loginForm.invalid) {
      return; }
  
      this.loading = true;


      //Checking the status of the user i.e If the User is Already Locked
      this.userService.getUserByEmail(data.email).subscribe(
        (response : UserDetail[]) => 
        {
          if(response.length>0)
          {
            if(response[0].retryCount==3)
            {

              this.showErrorMessage = true;
              this.errordetail='You Are Locked. Please Contact Your Admin';
              this.loading = false;
            }
            else{
              //Login the User and If the Login is Successful Transfer the User/Admin On their respective dashboard
              this.service.login(data).subscribe(
                (response) => {
                  localStorage.setItem('usertoken', JSON.stringify(response))
                  this.userService.getUserByEmail(data.email).subscribe(
                    (response:UserDetail[]) =>
                    {
                      localStorage.setItem('role',response[0].role)
                      if(response[0].role==='Admin')
                      {
                        this.router.navigate(['/admindashboard'],{ relativeTo: this.route })
                      }
                      else
                      {
                        this.router.navigate(['/userdashboard'],{ relativeTo: this.route })
                      }   
                    }

                  )
                  
            
                },
                (error) => {
                  //Checking the error status returned by the service and if the User exists already but the password is wrong
                  //increasing the retry value by 1 and if the retry count is equsl to 3 than locking the user
                  if(error.error==="Password is too short" || error.error==="Incorrect password")
                  {
                    this.GetLockStatsAndRetryCount(data)
                  }
                  //if User does not exist in the system
                  if(error.error==='Cannot find user')
                  {
                    this.showErrorMessage = true;
                    this.errordetail='The User Does Not Exist. Please Register';
                    this.loading = false;
                  }
                  //Any different Error
                  else
                  {
                    this.showErrorMessage = true;
                    this.errordetail=error.error;
                    this.loading = false;
                  }
                  
                }
              );
            }
          }
          else{
            this.showErrorMessage = true;
                    this.errordetail='The User Does Not Exist. Please Register';
                    this.loading = false;

          }
             
        }
      )
        
  }

  GetLockStatsAndRetryCount(data:UserDetail){
      this.userService.getUserByEmail(data.email).subscribe(
        (response : UserDetail[]) => 
        {
             if(response[0].retryCount==2)
            {
              this.retryCount = (response[0].retryCount)+1;
              let retryObj:any = {};
              retryObj.retryCount=this.retryCount;
              retryObj.lockstatus=1;
              this.lockUser(response[0].id,retryObj);
            }
            else{
              this.retryCount = (response[0].retryCount)+1;
              let retryObj:any = {}
              retryObj.retryCount=this.retryCount;
              this.postRetryCount(response[0].id,retryObj);
            }
        }
      )
  }

  postRetryCount(id:number,patchData:any)
  {
    this.userService.increaseRetryCount(id,patchData).subscribe(
      (response)=>
      {

        this.showErrorMessage = true;
        this.errordetail='Incorrect Password. You have '+ (3-this.retryCount)+' Chance Remaining Before Getting Locked';
        this.loading = false;
      }
    )
  }

  lockUser(id:number,patchData:any)
  {
    this.userService.increaseRetryCount(id,patchData).subscribe(
      (response)=>
      {

        this.showErrorMessage = true;
        this.errordetail='You Are Locked. Please Contact Your Admin';
        this.loading = false;
      }
    )
  }

  isUserLocked(user:UserDetail):boolean{
    let returnValue = false;
    this.userService.getUserByEmail(user.email).subscribe(
      (response : UserDetail[]) => 
      {
           if(response[0].retryCount==3)
          {
            returnValue=true;
          }
          else{
            returnValue=false;
          }
      }
    )
    return returnValue;
  }

}
