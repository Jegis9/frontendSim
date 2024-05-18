import { Component, OnInit,inject } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { PagosService } from '../../../services/pagos/pagos.service';

@Component({
  selector: 'app-pagos-rea-dash',
  standalone: true,
  imports: [SlidebarComponent],
  templateUrl: './pagos-rea-dash.component.html',
  styleUrl: './pagos-rea-dash.component.css'
})
export class PagosReaDashComponent {
  pagos: any[] = [];
  imagenUrl: string = '';

  constructor(private pagosService: PagosService) { }

  ngOnInit(): void {
    this.pagosService.list()
    .subscribe((pago: any) =>{
      this.pagos = pago.filter((p: any) => p.verificado);

    });
  }

  setImagenUrl(url: string): void {
    this.imagenUrl = url;
  }
}