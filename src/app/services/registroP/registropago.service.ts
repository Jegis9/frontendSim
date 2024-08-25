import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RegistropagoService {
  private http = inject(HttpClient);

  crear(pago: any){

    const secretKey = CryptoJS.enc.Utf8.parse('1234567890abcdef'); // Clave de 16 bytes (128 bits)
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

    const dataString = JSON.stringify(pago);

    const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    return this.http.post('https://apisimposio.shop/Participante/AddPago/1490-20-6399/11/imagen.jpg/2024-04-19T19:0',{data : encryptedData});
  }
}
