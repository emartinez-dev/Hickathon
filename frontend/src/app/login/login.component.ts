import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, public router: Router, private cookieService: CookieService) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  }
  loginProcess() {
    if (this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe((data) => {
        if (data.role == 'manager') {
          alert("Welcome Manager");
          this.router.navigate(['/manager']);
          this.cookieService.set('role', 'manager');
          this.cookieService.set('loged-in', 'true');
        } else if (data.role == 'employee'){
          this.router.navigate(['/employee']);
          this.cookieService.set('role', 'employee');
          this.cookieService.set('loged-in', 'true');
        } else {
          alert("Login Failed");
        }
      }, (error) => {
        alert("Login Failed");
      }
      )
    };
  };
}
