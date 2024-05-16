import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private fb = inject(FormBuilder);
  private PersonasService = inject(PersonasService);


  //ESTE ES EL FORMULARIO QUE RECIBIRA LOS DATOS
  form = this.fb.group(
    {
      
      carnet: [''],
      nombres:['', [Validators.required]],
      apellidos:['', [Validators.required]],
      correo:['', [Validators.required]],
      fechaNacimiento:['', [Validators.required]]
    });

    //AL MOMMENTO DE CREAR LOS DATOS, TOMA LOS TRES DATOS DE LOS TRES
    //INPUTS DEL CARNET 
    create (){
      const persona = this.form.value;
      const carnet1 = this.form.get('carnet')?.value;
      const carnet2 = (document.getElementById('Carnet2') as HTMLInputElement)?.value || '';
      const carnet3 = (document.getElementById('Carnet3') as HTMLInputElement)?.value || '';
    //CONCATENACION DE LOS TRES CAMPOS
      const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;


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


