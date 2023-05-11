import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup!: FormGroup;
  constructor(private authService: AuthServiceService, public router: Router ) { }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
  });
  }
  register() {
    this.authService.register(this.formGroup.value).subscribe((data) => { 
      console.log(data);
      if (data.status == 'ok') {
        alert("Register was succesful");
        this.router.navigate(['/login']); 
      }
    });
  }
}
