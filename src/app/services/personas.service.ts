import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {



  private http = inject(HttpClient);

  list(){
    
    return this.http.get('https://apisimposio.shop/Participante/Get');
  }

  crear(persona: any){
    return this.http.post('https://apisimposio.shop/Participante/Create',persona);
  }
}
