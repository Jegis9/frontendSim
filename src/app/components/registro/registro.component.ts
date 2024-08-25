import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  private router = inject(Router);

  constructor(private fb: FormBuilder, private personasService: PersonasService) {
    this.form = this.fb.group({
      carnet1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      carnet2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      carnet3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email, emailDomainValidator('miumg.edu.gt')]],
      confirmacionCorreo: ['', [Validators.required, Validators.email, emailDomainValidator('miumg.edu.gt')]],
    }, { validators: emailMatchValidator() });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Inicializa el reCAPTCHA
    setTimeout(() => {
      window['grecaptcha'].render('tu-recaptcha-element', {
        sitekey: '6LdDpt8pAAAAADLz_MpgfTqem-XnmTnuLgjJai4B'
      });
    }, 0);
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

  create(): void {
    if (!this.verificarCaptcha()) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const persona = this.form.value;
    persona.fechaNacimiento = '2000-01-01';
    const carnet1 = this.form.get('carnet1')?.value;
    const carnet2 = this.form.get('carnet2')?.value;
    const carnet3 = this.form.get('carnet3')?.value;

    const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

    this.personasService.consultaRegistro(carnetCompleto).subscribe({
      next: (response) => {
        // Si la persona ya está registrada
        Swal.fire({
          title: '¡No te preocupes!',
          text: 'Ya te encuentras registrado, por favor ingresa tu detalle',
          icon: 'info',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/detalle']);
        });
      },
      error: (error) => {
        if (error.status === 404) {
          // Si la persona no está registrada, proceder con el registro
          this.personasService.crear({ ...persona, carnet: carnetCompleto }).subscribe(() => {
            Swal.fire({
              title: '¡Hola!',
              text: 'Tu registro es exitoso, sigue con los demás pasos',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['/detalle']);
            });
          });
        } else {
          // Manejar otros errores
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al verificar el registro. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      }

    
    });
  }
}

export function emailMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('correo')?.value;
    const confirmEmail = control.get('confirmacionCorreo')?.value;
    if (email && confirmEmail && email !== confirmEmail) {
      return { emailMismatch: true };
    }
    return null;
  };
}

export function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [, emailDomain] = email.split('@');
      if (emailDomain !== domain) {
        return { emailDomain: true };
      }
    }
    return null;
  };
}

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajusta la edad si la fecha de cumpleaños aún no ha pasado este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= minAge ? null : { ageInvalid: { valid: false, message: `Debes tener al menos ${minAge} años` } };
  };
}
