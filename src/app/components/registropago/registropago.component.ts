import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagosService } from '../../services/pagos/pagos.service';
import { RegistropagoService } from '../../services/registroP/registropago.service';

@Component({
  selector: 'app-registropago',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registropago.component.html',
  styleUrl: './registropago.component.css'
})
export class RegistropagoComponent {
  // private fb = inject(FormBuilder)
  // private RegistropagoService = inject(RegistropagoComponent);

  // form = this.fb.group(
  //   {
      
  //     carnet: ['', [Validators.required]],
  //     nombres:['', [Validators.required]],
  //     apellidos:['', [Validators.required]],
  //     correo:['', [Validators.required]],
  //     fechaNacimiento:['', [Validators.required]]
  //   });

  //   create (){
  //     const persona = this.form.value;
  //     this.RegistropagoService.crear(pago)
  //     .subscribe(()=>{
  //       console.log("bien");
  //     });  
  //   }
}
