import { Component, OnInit, inject } from '@angular/core';
import { MerchadisingService } from '../../services/merchadising/merchadising.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DetallePagoService } from '../../services/detallePago/detalle-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallep',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './detallep.component.html',
  styleUrl: './detallep.component.css'
})
export class DetallepComponent implements OnInit {
  trackByFn(index: number, item: any): any {
    return item.id; // o cualquier otra propiedad única de tu item
  }

  private merchadisingService = inject(MerchadisingService);

  merchadising: any[] = [];

  ngOnInit(): void {
    this.merchadisingService.list()
      .subscribe((mercha: any) => {
        this.merchadising = mercha;
      });
  }

  private fb = inject(FormBuilder);
  private detalleService = inject(DetallePagoService);

  form = this.fb.group({
    carnet: [''],
    idMerchandising: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    opcion: ['', [Validators.required]],
    talla: [''],
   
  });

  create() {
    const carnet = this.form.get('carnet')?.value;

    if (carnet !== null && carnet !== undefined) {
        const detallePago = {
            carnet: carnet,
            merchandising: this.merchadising.map(item => ({
                id: item.id,
                cantidad: (document.getElementById(`cantidad-${item.id}`) as HTMLInputElement)?.value || '',
                talla: (document.getElementById(`talla-${item.id}`) as HTMLSelectElement)?.value || '', // Obtener la talla y cantidad
                precio: item.precio
            }))
        };

        this.detalleService.crear(detallePago.carnet, detallePago.merchandising)
            .subscribe(() => {
                Swal.fire({
                    title: '¡Hola!',
                    text: 'Tu registro es exitoso, sigue con los demás pasos',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            });
    } else {

    }
}

  
}
