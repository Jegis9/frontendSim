import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Rol {
  id: number;
  nombre: string;
}

interface Colaborador {
  id: number;
  usuario: string;
  contraseña: string;
  rol: Rol;
}

interface AuthResponse {
  colaborador: Colaborador;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://apisimposio.shop/Colaborador';

  constructor(private http: HttpClient) {}

  requestAccess(username: string, password: string): Observable<AuthResponse> {
    const body = {
      id: 0,
      usuario: username,
      contraseña: password,
      rol: {
        id: 0,
        nombre: "string"
      }
    };
    return this.http.post<AuthResponse>(`${this.apiUrl}/RequestAccess`, body);
  }
}


