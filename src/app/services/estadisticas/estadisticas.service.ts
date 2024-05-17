import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {


  constructor(private http: HttpClient) {}

  list(){
    
    return this.http.get('https://apisimposio.shop/Participante/Get');
  }

  list1(){
    
    return this.http.get('https://apisimposio.shop/Participante/GetPagos');
  }
}
