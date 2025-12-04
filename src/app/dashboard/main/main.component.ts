import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { MapaComponent } from '../mapa/mapa.component';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';
import { user } from 'src/app/core/interfaces/user';
import { RouterLink } from '@angular/router';
import { reportType } from 'src/app/core/interfaces/reportType';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [MapaComponent, CommonModule, FormsModule]
})
export class MainComponent  implements OnInit {
 //get my saved profile 

  userProfile: user | null = null;

  selectedReport: any = null;
  showStatusModal: boolean = false;
  status: number = 0;
  motivo: string = '';
  selectReport(report: any) {
    this.selectedReport = report;
  }
  constructor(private reportService: Report) { }
  reports: reports[] = [];
  statuss: reportType[] = [];



  //25.54705117569143, -103.3320192844014

  ngOnInit(): void {
    this.loadReports();
    this.loadProfile();
      this.loadStatuses(); 
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
          if (this.reports.length > 0) {
            this.selectedReport = this.reports[0];
          }
        },
        error: (error) => {
          console.error('Error fetching reports', error);
        }
      }
    )
  }
selectReportDetails(report: reports): void {
    this.selectedReport = report;
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
  loadStatuses() {
  this.reportService.getStatus().subscribe({
    next: (data) => {
      this.statuss = data;
      console.log("Statuses cargados:", this.statuss);
    },
    error: (err) => {
      console.error("Error al cargar statuses", err);
    }
  });
}

   openStatusModal(report: any) {
      if (!report) {
        console.warn("No se ha seleccionado ningún reporte");
        return;
      }
      this.selectedReport = report; // o como quieras
      this.status = this.selectedReport.status;
      this.motivo = '';
      this.showStatusModal = true;
  }

  // 🔹 Cerrar modal
  closeStatusModal() {
    this.showStatusModal = false;
  }

  // 🔹 Guardar cambios
  saveStatus() {
    
  if (!this.selectedReport) {
    console.error("No hay reporte seleccionado");
    return;
  }

  this.reportService.postReportEvents(
      this.selectedReport.id,  // reportId
      this.status,             // statusId
      this.motivo              // description
  ).subscribe({
    next: (resp) => {
      console.log("Evento guardado", resp);
      this.closeStatusModal();
      this.loadReports(); 
    },
    error: (err) => {
      console.error("Error al guardar evento", err);
    }
  });
  }

}
