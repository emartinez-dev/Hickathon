import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { ManagerService } from '../manager.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  displayedColumns: string[] = ['startDate', 'endDate', 'status', 'userId', 'button'];
  absencesPending: any;
  userData: any;
  userColumns: string[] = ['firstName', 'lastName', 'email', 'remainingDays', 'button' ];

  constructor(private managerService: ManagerService, public dialog: MatDialog) {
    this.managerService.getAbsences().subscribe((data) => {
      data = data.filter((absence: Absence) => absence.status === 'pending');
      this.absencesPending = data;
      this.absencesPending.map((absence: Absence) => {
        this.managerService.getUser(absence.userId).subscribe((user) => {
          absence.userId = user.firstName + ' ' + user.lastName;
        })
      })
    })
    this.managerService.getEmployees().subscribe((data) => {
      this.userData = data;
    })
  };

  getAllAbsences() {
    this.managerService.getAbsences().subscribe((data) => {
      this.absencesPending = data;
      this.absencesPending.map((absence: Absence) => {
        this.managerService.getUser(absence.userId).subscribe((user) => {
          absence.userId = user.firstName + ' ' + user.lastName;
        })
      })
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
