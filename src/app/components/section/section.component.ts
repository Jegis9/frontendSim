import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CarouselComponent, AccordionComponent,CardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

}
