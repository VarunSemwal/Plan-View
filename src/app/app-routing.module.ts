import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {WorkComponent} from './work/work.component';
import {RouteguardService} from './services/routeguard.service';
import {UserworkComponent} from './userwork/userwork.component';
import {MessagesComponent} from './messages/messages.component';
import {SubmittedTimesheetComponent} from './submitted-timesheet/submitted-timesheet.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';

const routes: Routes = [ 
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'admindashboard', component: AdminDashboardComponent,canActivate: [RouteguardService]},
{path:'user',       component:UserComponent,canActivate: [RouteguardService] },
{path:'app',       component:AppComponent},
{path:'work',       component:WorkComponent,canActivate: [RouteguardService]},
{path:'userwork',       component:UserworkComponent,canActivate: [RouteguardService]},
{path:'messages',       component:MessagesComponent,canActivate: [RouteguardService]},
{path:'timesheet',       component:SubmittedTimesheetComponent,canActivate: [RouteguardService]},
{path:'userdashboard',       component:UserDashboardComponent},
{ path: '', redirectTo: "/login", pathMatch: 'full' },
{path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
