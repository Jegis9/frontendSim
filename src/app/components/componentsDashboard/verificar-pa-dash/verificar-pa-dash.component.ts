import { Component, OnInit,inject } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { PagosService } from '../../../services/pagos/pagos.service';
import { ModalimageComponent } from '../../modalimage/modalimage.component';
@Component({
  selector: 'app-verificar-pa-dash',
  standalone: true,
  imports: [SlidebarComponent, ModalimageComponent],
  templateUrl: './verificar-pa-dash.component.html',
  styleUrl: './verificar-pa-dash.component.css'
})
export class VerificarPaDashComponent implements OnInit{

  private pagosService = inject(PagosService);

  pagos: any[] = [];
  
  ngOnInit(): void {
      this.pagosService.list()
      .subscribe((pago: any) =>{
        this.pagos = pago;
  
      });
}
}
