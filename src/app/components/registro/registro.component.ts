import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements AfterViewInit {
  form: FormGroup;
  private router = inject(Router)
  constructor(private fb: FormBuilder, private personasService: PersonasService) {
    this.form = this.fb.group({
      carnet1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      carnet2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      carnet3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]]
    });
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

  create() {
    if (!this.verificarCaptcha()) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const persona = this.form.value;
    const carnet1 = this.form.get('carnet1')?.value;
    const carnet2 = this.form.get('carnet2')?.value;
    const carnet3 = this.form.get('carnet3')?.value;

    const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

    this.personasService.crear({ ...persona, carnet: carnetCompleto }).subscribe(() => {
      Swal.fire({
        title: '¡Hola!',
        text: 'Tu registro es exitoso, sigue con los demás pasos',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigate(['/detalle']); // Usa this.router aquí
      });
    });
  }
}
