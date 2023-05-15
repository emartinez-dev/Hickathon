import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { ManagerService } from '../manager.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

export interface Absence {
  id: number;
  startDate: Date;
  endDate: Date;
  status: string;
  userId: string;
  workingDays: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  remainingDays: number;
  role: string;
}

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent {
  absencesTable: any;
  displayedColumns: string[] = ['startDate', 'endDate', 'workingDays','status', 'button'];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
    this.employeeService.getAbsences().subscribe((data) => {
      this.absencesTable = data;
    })
  }
  editAbsence(absence: Absence) {
    const dialogRef = this.dialog.open(EditAbsenceDialog, {
      data: absence
    });
    dialogRef.afterClosed().subscribe(result => {
      this.employeeService.getAbsences().subscribe((data) => {
        this.absencesTable = data;
      })
    });
  }
  createAbsence():void {
    const dialogRef = this.dialog.open(CreateAbsenceDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      this.employeeService.getAbsences().subscribe((data) => {
        this.absencesTable = data;
      })
    });
  }
}

@Component({
  selector: 'edit-absence-dialog',
  templateUrl: 'edit-absence-dialog.component.html',
})

export class EditAbsenceDialog {
  formGroup!: FormGroup;
  absence?: Absence;
  minDate?: Date;
  maxDate?: Date;
  user!: User;
  constructor(public dialogRef: MatDialogRef<EditAbsenceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Absence,
    private employeeService: EmployeeService) {
      this.minDate = new Date();
      this.employeeService.getUser().subscribe((data) => {
        this.user = data;
      })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.data.id, [Validators.required]),
      startDate: new FormControl(this.data.startDate, [Validators.required]),
      endDate: new FormControl(this.data.endDate, [Validators.required]),
      workingDays: new FormControl(this.data.workingDays, [Validators.required]),
      userId: new FormControl(this.data.userId, [Validators.required]),
      status: new FormControl(this.data.status, [Validators.required])
    });
  }
  editAbsence() {
    const absence = this.formGroup.value;
    if (absence.workingDays > this.user?.remainingDays) {
      alert("You don't have enough days left!");
      return;
    }
    absence.userId = this.user?.id;
    absence.status = 'pending';
    this.employeeService.editAbsence(absence).subscribe((data) => {
      this.employeeService.updateRemainingDays(this.user, absence).subscribe((data) => { })
      this.dialogRef.close();
    })
  }
}

@Component({
  selector: 'create-absence-dialog',
  templateUrl: 'create-absence-dialog.component.html',
})

export class CreateAbsenceDialog {
  formGroup!: FormGroup;
  absence?: Absence;
  minDate?: Date;
  maxDate?: Date;
  user!: User;
  constructor(public dialogRef: MatDialogRef<CreateAbsenceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Absence,
    private employeeService: EmployeeService) {
      this.minDate = new Date();
      this.employeeService.getUser().subscribe((data) => {
        this.user = data;
      })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      workingDays: new FormControl('', [Validators.required]),
      userId: new FormControl(this.user?.id, [Validators.required]),
      status: new FormControl('pending', [Validators.required])
    });
  }
  createAbsence() {
    const absence = this.formGroup.value;
    absence.workingDays = absence.endDate.getDate() - absence.startDate.getDate() + 1;
    if (absence.workingDays > this.user?.remainingDays) {
      alert("You don't have enough days left!");
      return;
    }
    absence.userId = this.user?.id;
    this.employeeService.createAbsence(absence).subscribe((data) => {
      this.employeeService.updateRemainingDays(this.user, absence).subscribe((data) => { })
      this.dialogRef.close();
    })
  }
}
