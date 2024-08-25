import { Component, OnInit,inject } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { PagosService } from '../../../services/pagos/pagos.service';
import { ModalimageComponent } from '../../modalimage/modalimage.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificar-pa-dash',
  standalone: true,
  imports: [SlidebarComponent, ModalimageComponent],
  templateUrl: './verificar-pa-dash.component.html',
  styleUrl: './verificar-pa-dash.component.css'
})
export class VerificarPaDashComponent implements OnInit{

  private pagosService = inject(PagosService);
  imagenUrl: string = '';
  pagos: any[] = [];
  
  ngOnInit(): void {
      this.pagosService.list()
      .subscribe((pago: any) =>{
        this.pagos = pago.filter((p: any) => !p.verificado);
  
      });
  }

  aceptarPago(idPago: number, carnet: string): void {
    this.pagosService.aceptarPago(idPago, carnet)
    .subscribe(
      (response) => {
        this.pagos = this.pagos.filter(pago => pago.id !== idPago);
        Swal.fire('Pago Verificado', 'El pago ha sido Verificado exitosamente', 'success');
      },
      (error) => {
        console.error('Error al verificar pago:', error);
        Swal.fire('Error', 'Ha ocurrido un error al verificar el pago', 'error');
      }
    );
  }

  rechazarPago(idPago: number, carnet: string): void {
    this.pagosService.rechazarPago(idPago, carnet)
    .subscribe(
      (response) => {
        this.pagos = this.pagos.filter(pago => pago.id !== idPago);
        Swal.fire('Pago Rechazado', 'El pago ha sido rechazado exitosamente', 'success');
      },
      (error) => {
        console.error('Error al rechazar el pago:', error);
        Swal.fire('Error', 'Ha ocurrido un error al rechazar el pago', 'error');
      }
    );
  }

  setImagenUrl(url: string): void {
    this.imagenUrl = url;
  }

}
