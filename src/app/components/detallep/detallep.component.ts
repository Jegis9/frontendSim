import { Component, OnInit, inject } from '@angular/core';
import { MerchadisingService } from '../../services/merchadising/merchadising.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DetallePagoService } from '../../services/detallePago/detalle-pago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detallep',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './detallep.component.html',
  styleUrl: './detallep.component.css'
})
export class DetallepComponent implements OnInit {
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  
  form!: FormGroup;
  merchadising: any[] = [];

  constructor(
    private detallePagoService: DetallePagoService,
    private merchadisingService: MerchadisingService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.merchadisingService.list().subscribe((mercha: any) => {
      this.merchadising = mercha;
    });

    this.form = this.fb.group({
      carnet: [''],
      idMerchandising: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      opcion: ['', [Validators.required]],
      talla: ['']
    });
  }

  create() {
    const carnet1 = this.form.get('carnet')?.value;
    const carnet2 = (document.getElementById('Carnet2') as HTMLInputElement)?.value || '';
    const carnet3 = (document.getElementById('Carnet3') as HTMLInputElement)?.value || '';
    const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;
  
    if (carnetCompleto !== null && carnetCompleto !== undefined) {
      const detallePago = {
        carnet: carnetCompleto,
        merchandising: this.merchadising.map(item => ({
          id: item.id,
          cantidad: this.form.get(`cantidad-${item.id}`)?.value || '',
          talla: this.form.get(`talla-${item.id}`)?.value || '',
          precio: item.precio
        })).filter(item => Number(item.cantidad) >= 1)
      };
  
      this.detallePagoService.consultaRegistro(carnetCompleto).subscribe(
        (response: any) => {
          // Verificamos si la respuesta es 404 o 0
          if (response?.status === 404 || response?.status === 0) {
            Swal.fire({
              title: '¡Hola!',
              text: 'Te falta registro',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.router.navigate(['/registro']);
          } else {
            // Continuar con la lógica actual
            this.detallePagoService.primeraApi(carnetCompleto).subscribe((resultadoPrimeraApi: any) => {
              if (resultadoPrimeraApi) {
                Swal.fire({
                  title: '¡Hola!',
                  text: 'Ya registraste tus productos, ahora paga',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.router.navigate(['/registropago']);
              } else {
                this.detallePagoService.createWithId(response.id, detallePago.merchandising).subscribe(() => {
                  Swal.fire({
                    title: '¡Hola!',
                    text: 'Tu registro es exitoso, sigue con los demás pasos',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.router.navigate(['/registropago']);
                });
              }
            });
          }
        },
        // Manejo de errores de la petición HTTP
        (error) => {
          console.error('Error al consultar el registro:', error);
          this.router.navigate(['/registro']); // Redirigir en caso de error
        }
      );
    }
  }
  }