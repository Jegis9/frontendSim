import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
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
export class DetallepComponent implements OnInit, AfterViewInit {

  trackByFn(index: number, item: any): any {
    return item.id;
}
ngAfterViewInit(): void {
  // Inicializa el reCAPTCHA
  setTimeout(() => {
    window['grecaptcha'].render('tu-recaptcha-element', {
      sitekey: '6LdDpt8pAAAAADLz_MpgfTqem-XnmTnuLgjJai4B'
    });
  }, 0);
}

verificarCaptcha(): boolean {
  const response = window['grecaptcha'].getResponse();
  if (!response) {
    Swal.fire({
      icon: 'warning',
      title: '¡Cuidado!',
      text: 'Primero debes de marcar ReCaptcha',
      confirmButtonColor: '#3366ff',
      confirmButtonText: 'Entendido'
    });
    return false;
  }
  return true;
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
    this.merchandisingService.list().subscribe((mercha: any) => {
        this.merchandising = mercha;
    });

    this.form = this.fb.group({
        carnet: [''],
        idMerchandising: ['', [Validators.required]],
        opcion: ['', [Validators.required]],
        talla: ['']
    });
}

autoFocusNext(nextElementId: string, maxLength: number) {
  const currentElement = document.activeElement as HTMLInputElement;
  if (currentElement.value.length >= maxLength) {
    const nextElement = document.getElementById(nextElementId) as HTMLInputElement;
    if (nextElement) {
      nextElement.focus();
    }
  }
}


create() {
  if (!this.verificarCaptcha()) {
    return;
  }
    const carnet1 = this.form.get('carnet')?.value;
    const carnet2 = (document.getElementById('Carnet2') as HTMLInputElement)?.value || '';
    const carnet3 = (document.getElementById('Carnet3') as HTMLInputElement)?.value || '';
    const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

    if (carnetCompleto !== null && carnetCompleto !== undefined) {
        const detallePago = {
            carnet: carnetCompleto,
            merchandising: this.merchandising.map(item => ({
                id: item.id,
                cantidad: 1,
                talla: (document.getElementById(`talla-${item.id}`) as HTMLSelectElement)?.value || '',
                precio: item.precio
            })).filter(item => Number(item.cantidad) >= 1)
        };

      this.detallePagoService.create(carnetCompleto, detallePago.merchandising).subscribe(
        () => {
          Swal.fire({
            title: '¡Genial!',
            text: 'Tu registro es exitoso, sigue con los demás pasos',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/registropago']);
        },
        (error) => {
          Swal.fire({
            title: '¡No estas registrado!',
            text: 'Registrate primero para poder continuar',
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
