import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { PersonasService } from '../../services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Agregar CommonModule aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  private fb = inject(FormBuilder);
  private personasService = inject(PersonasService);

  form = this.fb.group({
    carnet1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    carnet2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[0-9]*')]],
    carnet3: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
    nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', [Validators.required]]
  });

  create() {
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const persona = this.form.value;
    const carnetCompleto = `${persona.carnet1}-${persona.carnet2}-${persona.carnet3}`;


    //AQUI CREA MANDA AL SERVIDOR LOS CAMPOS, AL FORMULARIO LLAMADO "PERSONA"
    //Y DESPUES EN EL CARNET DEL FORMULARIO CARNET LE ASIGNARA LA CONCATENACION DEL CARNET
      this.PersonasService.crear({...persona,carnet:carnetCompleto})
      .subscribe(()=>{
        //SI TODO ESTA BIEN ENTONCES MUESTRA ESTE MENSAJE
        Swal.fire({
          title: '¡Genial!',
          text: 'Tu registro es existoso, sigue con los demas pasos',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

      });  
    }
    }


