import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

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
    
    const secretKey = CryptoJS.enc.Utf8.parse('1234567890abcdef'); // Clave de 16 bytes (128 bits)
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

    
    const passwordEncrypted = CryptoJS.AES.encrypt(password, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    const usernameEncrypted = CryptoJS.AES.encrypt(username, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    const body = {
      id: 0,
      usuario: usernameEncrypted,
      contraseña: passwordEncrypted,
      rol: {
        id: 0,
        nombre: "string"
      }
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/RequestAccess`, body);
  }
}


