import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { CardComponent } from '../card/card.component';
import { CardTemaComponent } from '../card-tema/card-tema.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CarouselComponent, AccordionComponent,CardComponent,CardTemaComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

}
