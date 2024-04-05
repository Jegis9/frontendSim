import { Component } from '@angular/core';
import { SlidebarComponent } from '../components/componentsDashboard/slidebar/slidebar.component';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [SlidebarComponent],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {

}
