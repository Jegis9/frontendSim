import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetallePagoService {

  constructor(private http: HttpClient) {}

  crear(carnet: string, merchandising: any[]): Observable<any> {
    const observables = merchandising.map(item => {
      const { id, cantidad, talla } = item;
      let url = `https://apisimposio.shop/Participante/AddMerchandising/${carnet}/${id}/${cantidad}`;
      if (talla) {
        url += `?opcion=${talla}`;
      }
      return this.http.post(url, {});
    });

    // Hacer la llamada a la segunda API después de completar la llamada a la primera
    return forkJoin(observables).pipe(
      switchMap(() => {
        const total = merchandising.reduce((acc, cur) => acc + (cur.cantidad * Number(cur.precio)), 0);
        const neto=total+350;
        console.log(neto)
        console.log('Total:', total);
        for (const item of merchandising) {
          console.log('id::', item.id)
          console.log('Cantidad:', item.cantidad);
          console.log('Precio:', item.precio);
        }
        
        const secondUrl = `https://apisimposio.shop/Participante/AddDetallePago/${carnet}/${neto}`;
        return this.http.post(secondUrl, {});
      }),
      tap(() => {
        Swal.fire({
          title: '¡Hola!',
          text: 'Tu registro es exitoso, sigue con los demás pasos',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
    );
  }
}
