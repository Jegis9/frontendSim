import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {

}
