import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {WorkService} from '../services/work.service';
import {WorkItem, WorkType} from '../models/work';
import { Router } from '@angular/router';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  worktypeForm: FormGroup;
  itemtypeForm: FormGroup;


  submitted = false;
  submitteditem=false;
  workTypeCode:string[] = [];
  
  constructor(private router:Router, private fb: FormBuilder,private modalService: NgbModal, private workservice : WorkService) { }

  ngOnInit(): void {
    document.body.className = "bg";
    this.BuildCreateWorkTypeForm();
    this.BuildCreateWorkItemForm();
    this.GetWorkType();

  }

  GetWorkType()
  {
    this.workservice.getWorkType().subscribe(
      (response : WorkType[])=>
      {
        for(let i=0; i<response.length;i++)
        {
          this.workTypeCode.push(response[i].WorkTypeCode);
        }
      },
      (error)=>{console.log(error);
      }
    )
  }

  BuildCreateWorkTypeForm(){
    this.worktypeForm = this.fb.group({
      description: ['', [Validators.required]],
      workTypeCode: ['', [Validators.required,Validators.pattern("^[A-Z0-9]+$"),Validators.maxLength(6)]]}, { 
        validator: this.ExistingWorkTypeValidator('workTypeCode')
      
  });
  }


  get f() { return this.worktypeForm.controls; }


  BuildCreateWorkItemForm(){
    this.itemtypeForm = this.fb.group({
      
      description: ['', [Validators.required]],
      worktypeCode: ['', [Validators.required]],
      itemCode: ['', [Validators.required,Validators.pattern("^[A-Z0-9]+$"),Validators.maxLength(6)]]}, { 
        validator: this.ExistingItemTypeValidator('itemCode')
  });
  }

  get g() { return this.itemtypeForm.controls; }

//Modals and Submission

  openModal(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  }

  openItemTypeModal(itemModal) {
    this.modalService.open(itemModal, {
     centered: true,
     backdrop: 'static'
    });
  }

  onSubmit(data:any) {
    this.submitted = true;
   
    if (this.worktypeForm.invalid) 
    {
      //this.modalService.dismissAll();
     return; 
    }
    
    let rawData = this.worktypeForm.getRawValue();
    let model:WorkType = new WorkType();
    model.WorkTypeCode = rawData.workTypeCode;
    model.Description = rawData.description;
    this.workservice.insertWorkType(model).subscribe(
      (response) => {
           alert('Work Type Created Succesfully');
           this.modalService.dismissAll();
           this.ngOnInit();
        },
      (error) => {
        console.log(error);
      })
    }

  onSubmitItemType(data:any) {
      this.submitteditem = true;
      
      if (this.itemtypeForm.invalid) 
      {
        //this.modalService.dismissAll();
       return; 
      }
      
     let rawData = this.itemtypeForm.getRawValue();
     let model : WorkItem = new WorkItem();

     model.WorkItemCode = rawData.itemCode;
     model.Description = rawData.description;
     model.WorkTypeCode = rawData.worktypeCode;

      
      this.workservice.insertWorkItem(model).subscribe(
        (response) => {
             alert('Item Type Created Succesfully');
             this.modalService.dismissAll();
             this.ngOnInit();
          },
        (error) => {
          console.log(error);
        })
      }

      logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('usertoken');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      }

      /////////Validators//////////////
      ExistingWorkTypeValidator(controlName: string){

        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.ExistingWorkTypeValidator) {
                return;
            }

            let value=control.value;

            this.workservice.getWorkTypeCode(value).subscribe(
              (response : WorkType[])=>
              {
                if(response.length>0)
                {
                  control.setErrors({ExistingWorkTypeValidator:true})
                }
                else{
                  control.setErrors(null);

                }
                
              },
              (error)=>{alert(error);
              }
            )
        }
      }

      ExistingItemTypeValidator(controlName: string){

        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (control.errors && !control.errors.ExistingItemTypeValidator) {
                return;
            }

            let value=control.value;

            this.workservice.getItemTypeCode(value).subscribe(
              (response : WorkItem[])=>
              {
                if(response.length>0)
                {
                  control.setErrors({ExistingItemTypeValidator:true})
                }
                else{
                  control.setErrors(null);

                }
                
              },
              (error)=>{alert(error);
              }
            )
        }
      }


}
