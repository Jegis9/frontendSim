import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { SlidebarComponent } from './components/componentsDashboard/slidebar/slidebar.component';
import { ChartModule } from 'angular-highcharts';
import { NgxChartsModule }from '@swimlane/ngx-charts';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,NgIf,SlidebarComponent,ChartModule,NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) { }

  isDashboardPage(): boolean {
    return this.router.url.includes('/dashboards');
  }
  
}


