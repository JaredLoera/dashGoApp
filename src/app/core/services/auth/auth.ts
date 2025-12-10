import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { token } from '../../interfaces/token';
import { responseMessage } from '../../interfaces/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly token = 'token';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


    isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.storageNames.token);
    // Agrega aquí cualquier lógica adicional para validar si el token es válido
    // (ej. si no ha expirado), pero para el ejemplo, solo verificamos su existencia.
    return !!token;
  }

  loginWithCode(email: string, code: string): Observable<token> {    
    return this.http.post<token>(`${this.apiUrl}/2fa/verify`, { email, code });
  }

  login(email: string, password: string): Observable<responseMessage> {
    return this.http.post<responseMessage>(`${this.apiUrl}/login`, { email, password });
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
