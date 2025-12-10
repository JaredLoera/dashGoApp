import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from '../mapa/mapa.component';
import { Report } from 'src/app/core/services/report/report';
import { reports } from 'src/app/core/interfaces/reports';
import { user } from 'src/app/core/interfaces/user';
import { RouterLink } from '@angular/router';
import { reportType } from 'src/app/core/interfaces/reportType';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [MapaComponent, CommonModule, FormsModule]
})
export class MainComponent implements OnInit {
  //get my saved profile 
  baseUrl: string = environment.apiUrl;

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