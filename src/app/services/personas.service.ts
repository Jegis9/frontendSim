import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PersonasService {


  constructor(private http: HttpClient, private router: Router) {}



  create(carnet: string, formData: any): Observable<any> {
    console.log("Datos del formulario:", formData);
    return this.consultaRegistro(carnet).pipe(
      switchMap((resultado: any) => {
        if (resultado.status === 200) {
          Swal.fire({
            icon: 'warning',
            title: '¡Cuidado!',
            text: 'Ya realizaste hay un registro con este carnet, compra tu producto',
            confirmButtonColor: '#3366ff', // Azul
            confirmButtonText: 'Entendido'
          });
          return EMPTY;
        } else {
          return this.crear(formData);
        }
      }),
      catchError((error: any) => {
        if (error.status === 404) {
          console.log("Datos para agregar detalle:", carnet, formData);
          return this.crear(formData);
        } else {
          console.error('Error en la solicitud:', error);
          return EMPTY;
        }
      })
    );
  }
  

  
  list(){
    
    return this.http.get('https://apisimposio.shop/Participante/Get');
  }


  consultaRegistro(carnet: string): Observable<any> {
    return this.http.get(`https://apisimposio.shop/Participante/GetByCarnet/${carnet}`);
}

  crear(persona: any){
    return this.http.post('https://apisimposio.shop/Participante/Create',persona);
  }
}
