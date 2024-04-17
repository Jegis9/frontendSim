import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {
  constructor(private router: Router) { }

  redirectToDashboard() {
    this.router.navigate(['/graficas']);
  }

}
