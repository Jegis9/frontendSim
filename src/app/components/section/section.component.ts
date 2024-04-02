import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CarouselComponent, AccordionComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

}
