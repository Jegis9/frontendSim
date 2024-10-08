import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DetallePagoService {
    constructor(private http: HttpClient, private router: Router) {}

    create(carnet: string, formData: any): Observable<any> {
        return this.consultaRegistro(carnet).pipe(
          switchMap((resultado: any) => {
            if (resultado === 404 || resultado === 0) {
              Swal.fire({
                title: '¡Registrate!',
                text: 'Aun no te encuentras registrado en el sistema, por favor registrate',
                icon: 'info',
                confirmButtonText: 'Ok'
              });
              this.router.navigate(['/registro']);
              return EMPTY;
            } 
            else {
              const idRegistro = resultado.id;
              this.verificarDetalle(carnet, formData, idRegistro).subscribe();
              return EMPTY;
            }
          }),
          catchError((error: any) => {
            console.error('Error en la solicitud:', error);
            return throwError('Ha ocurrido un error');
          })
        );
      }
    
      verificarDetalle(carnet: string, formData: any[], idRegistro: string): Observable<any> {
        return this.consultaDetalle(carnet).pipe(
          switchMap((resultado: any) => {
            //console.log(resultado);
            if (resultado > 0) {
              Swal.fire({
                icon: 'warning',
                title: '¡Cuidado!',
                text: 'Ya realizaste un detalle, ahora paga',
                confirmButtonColor: '#3366ff', // Azul
                confirmButtonText: 'Ok'
              });
              this.router.navigate(['/registropago']);
              return EMPTY;
            } else {
              return EMPTY; // Asegúrate de devolver un observable en todos los casos
            }
          }),
          catchError((error: any) => {
            if (error.status === 404) {
              var res = this.addDetalle(carnet, formData, idRegistro);
              this.router.navigate(['/registropago']);
              return res;
            } else {
              console.error('Error en la solicitud:', error);
              return EMPTY;
            }
          })
        );
      }
    
    
    
    addDetalle(carnet: string, formData: any[], idRegistro: string): Observable<any> {
        const observables = formData.map(item => {
            const { id, cantidad, talla } = item;
            let url = `https://apisimposio.shop/Participante/AddMerchandising/${idRegistro}/${id}/${cantidad}`;
            if (talla) {
                url += `?opcion=${talla}`;
            }
            return this.http.post(url, {});
        });
    
        return forkJoin(observables).pipe(
            switchMap(() => {
                const total = formData.reduce((acc, cur) => acc + (cur.cantidad * Number(cur.precio)), 0);
                const neto = total + 300;
                //console.log('Total:', total);
                //console.log('Neto:', neto);
        
                const secondUrl = `https://apisimposio.shop/Participante/AddDetallePago/${idRegistro}/${neto}`;
                return this.http.post(secondUrl, {});
            }),
            tap(() => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Detalle correcto, revisa tu correo!',
                    confirmButtonColor: '#33cc33', // Verde
                    confirmButtonText: '¡Genial!'
                  });
            })
            
        );
    }
    
    consultaRegistro(carnet: string): Observable<any> {
        return this.http.get(`https://apisimposio.shop/Participante/GetByCarnet/${carnet}`);
    }
    
    consultaDetalle(carnet: string): Observable<any> {
        return this.http.get(`https://apisimposio.shop/Participante/DetallePagoByCarnet/${carnet}`);
    }
}    


