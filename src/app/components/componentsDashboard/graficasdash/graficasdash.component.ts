import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartType } from 'chart.js/auto';
import { EstadisticasService } from '../../../services/estadisticas/estadisticas.service';
import { forkJoin } from 'rxjs';
import { SlidebarComponent } from '../slidebar/slidebar.component';

@Component({
  selector: 'app-graficasdash',
  standalone: true,
  imports: [SlidebarComponent],
  templateUrl: './graficasdash.component.html',
  styleUrls: ['./graficasdash.component.css']



})
export class GraficasdashComponent implements OnInit {
  chart: Chart;
  chart2: Chart;
  chart3: Chart;
  totalPersonasList: number;
  totalPersonasList1: number;
  personasPorAno: { [key: string]: number } = {};

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    forkJoin([
      this.estadisticasService.list(),
      this.estadisticasService.list1()
    ]).subscribe(([personasList, personasList1]: [any[], any[]]) => {
      this.totalPersonasList = personasList.length;
      this.totalPersonasList1 = personasList1.length;

      // Agrupar personas por año de nacimiento
      this.personasPorAno = this.agruparPorAno(personasList);
      

      console.log('Total de personas en list:', this.totalPersonasList);
      console.log('Total de personas en list1:', this.totalPersonasList1);
      console.log('Personas por año de nacimiento:', this.personasPorAno);

      // Chart 2
      const data2 = {
        labels: ['Personas registradas', 'Pago realizado'],
        datasets: [{
          label: 'Registros vs Pago',
          data: [this.totalPersonasList, this.totalPersonasList1],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };

      this.chart2 = new Chart("chart", {
        type: 'pie' as ChartType,
        data: data2,
      });



      const data = {
        labels: Object.keys(this.personasPorAno),
        datasets: [{
          label: 'Personas registradas por año de nacimiento',
          data: Object.values(this.personasPorAno),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'

          ],
          hoverOffset: 4
        }]
      };

      this.chart = new Chart("chart2", {
        type: 'pie' as ChartType,
        data: data,
      });


      document.getElementById('total').innerText = this.totalPersonasList.toString();

      document.getElementById('total2').innerText = this.totalPersonasList1.toString();

    });
  }
  

  agruparPorAno(personas: any[]): { [key: string]: number } {
    return personas.reduce((acc, persona) => {
      const ano = new Date(persona.fechaNacimiento).getFullYear();
      acc[ano] = (acc[ano] || 0) + 1;
      return acc;
    }, {});
  }
}


