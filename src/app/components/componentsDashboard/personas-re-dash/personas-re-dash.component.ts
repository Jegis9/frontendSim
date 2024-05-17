import { Component, OnInit, inject } from '@angular/core';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { PersonasService } from '../../../services/personas.service';
import { PersonasInterface } from '../../../interface/personas.interface';

@Component({
  selector: 'app-personas-re-dash',
  standalone: true,
  imports: [SlidebarComponent],
  templateUrl: './personas-re-dash.component.html',
  styleUrl: './personas-re-dash.component.css'
})


export class PersonasReDashComponent implements OnInit  {
private personasService = inject(PersonasService);

personas: any[] = [];

ngOnInit(): void {
    this.personasService.list()
    .subscribe((persona: any) =>{
      this.personas = persona;
      console.log("aqui debe de aparecer el total",persona.length)
    });
    
}




}
