import { Component } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { PersonasService } from '../../../services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [SlidebarComponent],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.css'
})
export class AsistenciaComponent {

  personas: any[] = [];

  constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    this.personasService.listAsistencia()
    .subscribe((persona: any) =>{
      this.personas = persona;
    });
  }

  enviarCertificados()
  {
    this.personasService.enviarCertificados()
    .subscribe(
      (response) => {
        Swal.fire('Certificados Enviados', 'Los Certificados se han enviado correctamente', 'success');
        //console.log(response);
      },
      (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al enviar los certificados', 'error');
        
      }
    );
  }
}

