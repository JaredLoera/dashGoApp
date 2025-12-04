import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { reports } from '../../interfaces/reports';
import { reportType } from '../../interfaces/reportType';
import { responseMessage } from '../../interfaces/responseMessage';
import { ReportStatus } from '../../interfaces/reportStatus';
@Injectable({
  providedIn: 'root'
})
export class Report {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getMyReports(): Observable<reports[]> {
    return this.http.get<reports[]>(this.apiUrl+'/my-reports');
  }
  getReportsTypes(): Observable<reportType[]> {
    return this.http.get<reportType[]>(`${this.apiUrl}/report-types`);
  }
  reportsfinishedpending(): Observable<reports[]> {
    return this.http.get<reports[]>(this.apiUrl+'/reportsfinishedpending');
  }
  createReport(reportData: FormData): Observable<responseMessage> {
    return this.http.post<responseMessage>(this.apiUrl + '/reports', reportData);
  }
  getAllReports(): Observable<reports[]> {
    return this.http.get<reports[]>(this.apiUrl + '/reports');
  }
  getStatus() : Observable<ReportStatus[]> {
    return this.http.get<ReportStatus[]>(this.apiUrl + '/report-status');
  }
  postReportEvents(reportId: number, status: number, motivo: string) {
    const body = {reportreportId: reportId, reportStatusId: status, description:motivo };
     return this.http.post(`${this.apiUrl}/report-events`, body);
  }
}
