import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPagoService {

  constructor(private http: HttpClient) { }

  obtenerDetalle(carnet: any){
    let detallePago = `https://apisimposio.shop/Participante/DetallePagoByCarnet/${carnet}`
    return this.http.get(detallePago,{})
  }

  crear(carnetCompleto: string, detallePago: any, imagen: any, persona: any) {
    return this.http.post(`https://apisimposio.shop/Participante/AddPago/${carnetCompleto}/${detallePago}/${imagen}/2024-04-19T19:0`, persona);
  }
}
