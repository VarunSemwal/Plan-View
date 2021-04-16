import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { WorkComponent } from './work/work.component';
import { UserworkComponent } from './userwork/userwork.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {CommonModule} from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import {DOBPipe} from './validators/dobpipe';
import { SubmittedTimesheetComponent } from './submitted-timesheet/submitted-timesheet.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserComponent,
    WorkComponent,
    UserworkComponent,
    MessagesComponent,
    DOBPipe,
    SubmittedTimesheetComponent,
    UserDashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
