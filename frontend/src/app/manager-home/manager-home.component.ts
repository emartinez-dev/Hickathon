import { Component, OnInit, OnChanges } from '@angular/core';
import { ManagerService } from '../manager.service';
import { filter } from 'rxjs';

export interface Absence {
  startDate: Date;
  endDate: Date;
  status: string;
  userId: string;
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

  constructor(private managerService: ManagerService) {
    this.managerService.getAbsences().subscribe((data) => {
      data = data.filter((absence: Absence) => absence.status === 'pending');
      this.absencesPending = data;
      this.absencesPending.map((absence: Absence) => {
        this.managerService.getUser(absence.userId).subscribe((user) => {
          absence.userId = user.firstName + ' ' + user.lastName;
        })
      })
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
}
