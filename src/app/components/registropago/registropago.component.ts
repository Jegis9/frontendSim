import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddPagoService } from '../../services/addPago/add-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registropago',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registropago.component.html',
  styleUrl: './registropago.component.css'
})
export class RegistropagoComponent {
  // private fb = inject(FormBuilder);
  // private AddPago = inject(AddPagoService);
  
  // selectedFile: File | undefined;

  // onFileSelected(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     console.log('Archivo seleccionado:', this.selectedFile?.name);
  //   }
  // }

  // // ESTE ES EL FORMULARIO QUE RECIBIRA LOS DATOS
  // form = this.fb.group(
  //   {
  //     carnet: [''],
  //     numeropago:['', [Validators.required]],
  //     imagen:['', [Validators.required]]
  //   });

  // // AL MOMENTO DE CREAR LOS DATOS, TOMA LOS TRES DATOS DE LOS TRES
  // // INPUTS DEL CARNET 
  // create (){
  //   const persona = this.form.value;
  //   const carnet1 = this.form.get('carnet')?.value;
  //   const carnet2 = (document.getElementById('Carnet2') as HTMLInputElement)?.value || '';
  //   const carnet3 = (document.getElementById('Carnet3') as HTMLInputElement)?.value || '';
  //   // CONCATENACION DE LOS TRES CAMPOS
  //   const carnetCompleto = `${carnet1}-${carnet2}-${carnet3}`;

  //   // Obtener el detalle del pago
  //   this.AddPago.obtenerDetalle(carnetCompleto).subscribe((resultado: any) => {
  //     console.log(resultado);
  //     const detallePago = resultado.detallePago; // Asegúrate de que el nombre del campo sea correcto

  //     // Crear un FormData para enviar la imagen
  //     const formData = new FormData();
  //     if (this.selectedFile) {
  //       formData.append('imagen', this.selectedFile);
  //     } else {
  //       // Manejar el caso en el que no se seleccionó ninguna imagen
  //     }

  //     // Llamar a la API para agregar el pago
  //     this.AddPago.crear(carnetCompleto, detallePago, formData, '2024-04-19T19:0')
  //       .subscribe(() => {
  //         // SI TODO ESTA BIEN ENTONCES MUESTRA ESTE MENSAJE
  //         Swal.fire({
  //           title: '¡Hola!',
  //           text: 'Tu registro es exitoso, sigue con los demás pasos',
  //           icon: 'success',
  //           confirmButtonText: 'Ok'
  //         });
  //       });
  //   });
  // }
}
