import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  constructor(private router: Router) {}

  redirectToRegistro() {
    this.router.navigate(['/registro']);
  }
}
