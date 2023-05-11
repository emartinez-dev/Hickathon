import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService) { }
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
        if (data.role) {
          alert("Login Successful");
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
