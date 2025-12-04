import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { token } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly token = 'token';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<token> {
    return this.http.post<token>(`${this.apiUrl}/login`, { email, password });
  }
  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.token);
  }
  clearToken(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(environment.storageNames.user);
  }
}
