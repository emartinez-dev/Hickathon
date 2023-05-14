import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { ManagerService } from '../manager.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Absence {
  id: number;
  startDate: Date;
  endDate: Date;
  status: string;
  userId: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  remainingDays: number;
  role: string;
}

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})

export class ManagerHomeComponent {
  absencesTable: any;
  displayedColumns: string[] = ['startDate', 'endDate', 'status', 'fullName', 'button'];
  absencesPending: any;
  userData: any;
  userColumns: string[] = ['firstName', 'lastName', 'email', 'remainingDays', 'button' ];

  constructor(private managerService: ManagerService, public dialog: MatDialog) {
    this.managerService.getAbsences().subscribe((data) => {
      data = data.filter((absence: Absence) => absence.status === 'pending');
      this.absencesPending = data;
    })
    this.managerService.getEmployees().subscribe((data) => {
      this.userData = data;
    })
  };

  getAllAbsences() {
    this.managerService.getAbsences().subscribe((data) => {
      data = data.filter((absence: Absence) => absence.status === 'pending');
      this.absencesPending = data;
      return data;
    })
  }

  acceptAbsence(absence: Absence) {
  this.managerService.acceptAbsence(absence).subscribe(response => {
      this.absencesTable.data = this.getAllAbsences();
    })
  }

  declineAbsence(absence: Absence) {
    this.managerService.declineAbsence(absence).subscribe(response => {
      this.managerService.updateRemainingDays(absence.userId, absence).subscribe(response => {
      });
      this.absencesTable.data = this.getAllAbsences();
    })
  }

  deleteAbsence(absence: Absence) {
    this.managerService.deleteAbsence(absence.id).subscribe(response => {
      this.absencesTable.data = this.getAllAbsences();
    })
  }

  editUser(user: any):void {
    const dialogRef = this.dialog.open(EditUserDialog, {
      data: user});
    dialogRef.afterClosed().subscribe(result => {
      this.userData = this.managerService.getEmployees();
    });
  }
  createUser():void {
    const dialogRef = this.dialog.open(NewUserDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      this.userData = this.managerService.getEmployees();
    });
  }
}

@Component({
  selector: 'edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
})

export class EditUserDialog {
  user?: User;
  constructor(public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User, private managerService: ManagerService) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteUser(user: any) {
    console.log(user);
    this.managerService.deleteUser(user.id).subscribe((response) => {
      console.log(response);
    });
    this.dialogRef.close(user);
  }
  updateUser(user: any) {
    console.log(user);
    this.managerService.updateUser(user, user).subscribe((response) => {
      console.log(response);
    });
    this.dialogRef.close(user);
  }
}

@Component({
  selector: 'new-user-dialog',
  templateUrl: 'new-user-dialog.component.html',
})

export class NewUserDialog {
  user?: User;
  formGroup!: FormGroup;
  constructor(private authService:AuthServiceService ,public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User, private managerService: ManagerService) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
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
      absenceDays: new FormControl('', [Validators.required, Validators.min(0)]),
  });
  }
  register() {
    this.authService.register(this.formGroup.value).subscribe((data) => { 
      console.log(data);
      if (data.status == 'ok') {
        alert("Register was succesful");
        this.dialogRef.close();}
    });
  }
}
