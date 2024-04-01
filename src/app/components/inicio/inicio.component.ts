import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SectionComponent } from '../section/section.component';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NavBarComponent,SectionComponent,HeaderComponent,ButtonComponent,FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
