import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchadisingService {

  private http = inject(HttpClient);

  list(){
    return this.http.get('https://apisimposio.shop/Merchandising/Get')
  }
}


