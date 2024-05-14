import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePagoService {

    constructor(private http: HttpClient, private router: Router) {}
  
    create(carnet: string, merchandising: any[]): Observable<any> {
      return this.consultaRegistro(carnet).pipe(
        switchMap((resultado: any) => {
          if (resultado  === 404 || resultado === 0) {

            this.router.navigate(['/registro']);
            
            return EMPTY;
          } else {
            // Si se recibe respuesta, consultar la primera API
            return this.primeraApi(carnet).pipe(
              switchMap((resultadoPrimeraApi: any) => {
                console.log(resultado.id)
                if (resultadoPrimeraApi ===404 || resultadoPrimeraApi===0) {
               
                 

                  return this.createWithId(resultado.id, merchandising);
                } else {
                  // Si la primera API no devuelve nada, continuar con el proceso de creación
                  
                  this.router.navigate(['/registropago']);
                  return EMPTY;
                
                
                }
              })
            );
          }
        })
      );
    }
  
    public createWithId(id: string, merchandising: any[]): Observable<any> {
      const observables = merchandising.map(item => {
        const { id: merchId, cantidad, talla } = item;
        let url = `https://apisimposio.shop/Participante/AddMerchandising/${id}/${merchId}/${cantidad}`;
        if (talla) {
          url += `?opcion=${talla}`;
        }
        return this.http.post(url, {});
      });
  
      return forkJoin(observables).pipe(
        switchMap(() => {
          const total = merchandising.reduce((acc, cur) => acc + (cur.cantidad * Number(cur.precio)), 0);
          const neto = total + 350;
          console.log(neto);
          console.log('Total:', total);
          for (const item of merchandising) {
            console.log('id::', item.id);
            console.log('Cantidad:', item.cantidad);
            console.log('Precio:', item.precio);
          }
  
          const secondUrl = `https://apisimposio.shop/Participante/AddDetallePago/${id}/${neto}`;
          return this.http.post(secondUrl, {}).pipe(
            tap(() => {

            })
          );
        })
      );
    }
  
    consultaRegistro(carnet: string): Observable<any> {
      return this.http.get(`https://apisimposio.shop/Participante/GetByCarnet/${carnet}`);
    }
  
    primeraApi(carnet: string): Observable<any> {
      return this.http.get(`https://apisimposio.shop/Participante/DetallePagoByCarnet/${carnet}`);
    }
  }
  
  
