import { Component } from '@angular/core';
import { GraficasdashComponent } from '../graficasdash/graficasdash.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [GraficasdashComponent,RouterOutlet],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {

}
