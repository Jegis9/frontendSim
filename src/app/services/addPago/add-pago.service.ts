import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPagoService {

  constructor(private http: HttpClient) { }

  obtenerDetalle(carnet: any){
    let detallePago = `https://apisimposio.shop/Participante/DetallePagoByCarnet/${carnet}`
    return this.http.get<number>(detallePago);
  }

  obtenerPago(idDetalle: number){
    let idPago = `https://apisimposio.shop/Participante/GetPagoByDetalle/${idDetalle}`
    return this.http.get<number>(idPago);
  }

  crear(carnetCompleto: string, detallePago: any, imagen: any, fechaHora: any) {
    const encodedImagen = encodeURIComponent(imagen);
    return this.http.post(`https://apisimposio.shop/Participante/AddPago/${carnetCompleto}/${detallePago}/${encodedImagen}/${fechaHora}`, {});
  }
}
