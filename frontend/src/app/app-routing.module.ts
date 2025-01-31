import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'employee', component: EmployeeHomeComponent},
  {path: 'manager', component: ManagerHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
