import { Component, OnInit, OnChanges } from '@angular/core';
import { ManagerService } from '../manager.service';

export interface Absence {
  startDate: string;
  status: string;
}

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})

export class ManagerHomeComponent {
  absencesTable: any;
  displayedColumns: string[] = ['startDate', 'endDate', 'status'];
  dataSource = [];
  constructor(private managerService: ManagerService) {
    this.managerService.getAbsences().subscribe((data) => {
      console.log(data);
      this.dataSource = data;
    });
  };
}
