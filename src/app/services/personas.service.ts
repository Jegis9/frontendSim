import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {


  constructor(private http: HttpClient, private router: Router) {}



  list(){
    
    return this.http.get('https://apisimposio.shop/Participante/Get');
  }

  listAsistencia(){
    
    return this.http.get('https://apisimposio.shop/Participante/GetAsistencia');
  }

  enviarCertificados(){
    
    return this.http.post('https://apisimposio.shop/Participante/SendCertificate', {});
  }

  consultaRegistro(carnet: string): Observable<any> {
    return this.http.get(`https://apisimposio.shop/Participante/GetByCarnet/${carnet}`);
}

  crear(persona: any){

    const secretKey = CryptoJS.enc.Utf8.parse('1234567890abcdef'); // Clave de 16 bytes (128 bits)
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

    const dataString = JSON.stringify(persona);

    const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return this.http.post('https://apisimposio.shop/Participante/Create', { data: encryptedData });
  }
}
