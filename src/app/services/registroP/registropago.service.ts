import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistropagoService {
  private http = inject(HttpClient);

  crear(pago: any){
    return this.http.post('https://apisimposio.shop/Participante/AddPago/1490-20-6399/11/imagen.jpg/2024-04-19T19:0',pago);
  }
}
