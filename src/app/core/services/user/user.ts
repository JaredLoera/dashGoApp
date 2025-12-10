import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../../interfaces/user';
import { responseMessage } from '../../interfaces/responseMessage';
@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getUserProfile(): Observable<user> {
    return this.http.get<user>(`${this.apiUrl}/profile`);
  }
 

  // Obtener todos los admins
  getAdmins(): Observable<user[]> {
    return this.http.get<user[]>(`${this.apiUrl}/admin`);
  }

  // Crear admin
  createAdmin(userData: Partial<user>): Observable<responseMessage> {
    return this.http.post<responseMessage>(`${this.apiUrl}/admin`, userData);
  }

  // Actualizar usuario
  updateUser(id: number, userData: Partial<user>): Observable<responseMessage> {
    return this.http.put<responseMessage>(`${this.apiUrl}/${id}`, userData);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<responseMessage> {
    return this.http.delete<responseMessage>(`${this.apiUrl}/${id}`);
  }

}
