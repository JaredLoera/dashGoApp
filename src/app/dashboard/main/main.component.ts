import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';
import { user } from 'src/app/core/interfaces/user';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [MapaComponent, CommonModule]
})
export class MainComponent  implements OnInit {
 //get my saved profile 

  userProfile: user | null = null;


  constructor(private reportService: Report) { }
  reports: reports[] = [];


  //25.54705117569143, -103.3320192844014

  ngOnInit(): void {
    this.loadReports();
    this.loadProfile();
  }

  private loadProfile(): void {
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
  reportsData = [
    {
      id: 1,
      title: 'Reporte #1',
      type: 'Fuga de agua',
      address: 'Calle 5 #123',
      description: 'Descripción del reporte 1',
      status: 'Pendiente',
      lat: 25.548203125956256,
      lng: -103.31837215380118
    },
    {
      id: 2,
      title: 'Reporte #2',
      type: 'Sin servicio eléctrico',
      address: 'Calle 8 #90',
      description: 'Descripción del reporte 2',
      status: 'En proceso',
      lat: 25.534252753884846,
      lng: -103.36038343176841
    }
  ];


}
