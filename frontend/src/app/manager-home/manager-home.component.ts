import { Component, OnInit, OnChanges } from '@angular/core';
import { ManagerService } from '../manager.service';

export interface Absence {
  startDate: Date;
  endDate: Date;
  status: string;
  userName: string;
}

const DATA: Absence[] = [
  {startDate: new Date(), endDate: new Date(), status: 'Pending', userName: 'Enrique'},
  {startDate: new Date(), endDate: new Date(), status: 'Pending', userName: 'Enrique'},
  {startDate: new Date(), endDate: new Date(), status: 'Pending', userName: 'Enrique'},
  {startDate: new Date(), endDate: new Date(), status: 'Pending', userName: 'Enrique'},
  {startDate: new Date(), endDate: new Date(), status: 'Pending', userName: 'Enrique'},
]

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})

export class ManagerHomeComponent {
  absencesTable: any;
  displayedColumns: string[] = ['startDate', 'endDate', 'status', 'userName', 'button'];
  absencesPending = DATA;
  /*
  constructor(private managerService: ManagerService) {
    this.managerService.getAbsences().subscribe((data) => {
      console.log(data);
      this.absencesPending = data;
    });
  };
    */
}
