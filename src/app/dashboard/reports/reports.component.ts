import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/core/interfaces/user';
import { RouterLink } from '@angular/router';
import { reports } from 'src/app/core/interfaces/reports';
import { Report } from 'src/app/core/services/report/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class ReportsComponent  implements OnInit {
  
  userProfile: user | null = null;
  reports: reports[] = [];
  
  constructor( private reportService: Report) { }

  ngOnInit() {
    this.loadReports();
    this.loadProfile();
  }

  loadProfile(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userProfile = JSON.parse(userData);
    }
  }
    private loadReports(): void {
      this.reportService.getAllReports().subscribe(
        {
          next: (data: reports[]) => {
            this.reports = data;
          },
          error: (error) => {
            console.error('Error fetching reports', error);
          }
        }
      )
    }

}
