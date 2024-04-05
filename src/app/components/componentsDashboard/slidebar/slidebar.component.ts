import { Component } from '@angular/core';
import { GraficasdashComponent } from '../graficasdash/graficasdash.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PagosReaDashComponent } from '../pagos-rea-dash/pagos-rea-dash.component';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [GraficasdashComponent,RouterOutlet,GraficasdashComponent,PagosReaDashComponent,RouterLink],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {

}
