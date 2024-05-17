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
}
