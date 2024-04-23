import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';

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

  form = this.fb.group(
    {
      
      carnet: ['', [Validators.required]],
      nombres:['', [Validators.required]],
      apellidos:['', [Validators.required]],
      correo:['', [Validators.required]],
      fechaNacimiento:['', [Validators.required]]
    });

    create (){
      const persona = this.form.value;
      this.PersonasService.crear(persona)
      .subscribe(()=>{
        console.log("bien");
      });  
    }
    }


