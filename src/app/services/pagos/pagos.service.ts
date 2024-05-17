import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private http = inject(HttpClient);

  list(){
    return this.http.get('https://apisimposio.shop/Participante/GetPagos')
  }

  aceptarPago(idPago: number, carnet: string){
    let confirmar = `https://apisimposio.shop/Participante/PagoVerificado/${idPago}/${carnet}`
    return this.http.post(confirmar, {})
  }

  rechazarPago(idPago: number, carnet: string){
    let rechazar = `https://apisimposio.shop/Participante/BorrarPago/${idPago}/${carnet}`
    return this.http.post(rechazar, {})
  }
}
