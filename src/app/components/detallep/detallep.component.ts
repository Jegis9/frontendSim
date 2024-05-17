import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchadisingService } from '../../services/merchadising/merchadising.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DetallePagoService } from '../../services/detallePago/detalle-pago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detallep',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detallep.component.html',
  styleUrls: ['./detallep.component.css']
})
export class DetallepComponent implements OnInit {
  trackByFn(index: number, item: any): any {
    return item.id;
  }

  form!: FormGroup;
  merchandising: any[] = [];

  constructor(
    private detallePagoService: DetallePagoService,
    private merchandisingService: MerchadisingService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      carnet1: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      carnet2: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      carnet3: ['', [Validators.required, Validators.pattern(/^\d{3,6}$/)]]
    });

    this.merchandisingService.list().subscribe((mercha: any) => {
      this.merchandising = mercha;

      // Crear controles dinámicos para cada item de merchandising
      mercha.forEach((item: any) => {
        if (item.nombre === 'Playera UMG') {
          this.form.addControl(`talla-${item.id}`, this.fb.control('', Validators.required));
          this.form.addControl(`cantidad-${item.id}`, this.fb.control({ value: 1, disabled: true }, Validators.required));
        } else {
          this.form.addControl(`cantidad-${item.id}`, this.fb.control(''));
        }
      });
    });
  }

  create() {
    const carnet1 = this.form.get('carnet1')?.value;
    const carnet2 = this.form.get('carnet2')?.value;
    const carnet3 = this.form.get('carnet3')?.value;
    const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

    if (this.form.valid) {
      const detallePago = {
        carnet: carnetCompleto,
        merchandising: this.merchandising.map(item => ({
          id: item.id,
          cantidad: item.nombre === 'Playera UMG' ? 1 : this.form.get(`cantidad-${item.id}`)?.value || '',
          talla: this.form.get(`talla-${item.id}`)?.value || '',
          precio: item.precio
        })).filter(item => Number(item.cantidad) >= 1)
      };

      this.detallePagoService.create(carnetCompleto, detallePago.merchandising).subscribe(
        () => {
          Swal.fire({
            title: '¡Hola!',
            text: 'Tu registro es exitoso, sigue con los demás pasos',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/registropago']);
        },
        (error) => {
          Swal.fire({
            title: '¡No estás registrado!',
            text: 'Por favor regístrate primero',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          console.error('Error al crear el registro:', error);
          this.router.navigate(['/registro']); // Redirigir en caso de error
        }
      );
    }
  }
}
