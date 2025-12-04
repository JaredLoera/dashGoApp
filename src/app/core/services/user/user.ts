import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getUserProfile(): Observable<user> {
    return this.http.get<user>(`${this.apiUrl}/profile`);
  }
 

}
