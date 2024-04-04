import { Component } from '@angular/core';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [NavBarAdminComponent],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

}
