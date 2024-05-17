import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule  
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) 
    { 
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    }

    onSubmit() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.authService.requestAccess(username, password).subscribe(
          response => {
            const { colaborador, token } = response;
  
            // Almacenar el JWT en localStorage
            localStorage.setItem('token', token);
  
            // Manejar los datos del colaborador si es necesario
            console.log('Colaborador:', colaborador);
  
            Swal.fire('¡Bienvenido!', 'Iniciaste sesión correctamente', 'success');
            this.redirectToDashboard();
          },
          error => {
            console.error('Ocurrio un error:', error);
            Swal.fire('Login fallido', 'Ocurrio un error al intentar logearse', 'error');
          }
        );
      }
    }

    redirectToDashboard() {
      this.router.navigate(['/personas']);
    }

}
