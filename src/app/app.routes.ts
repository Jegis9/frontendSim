import { Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
    { path: 'navbar', component: NavBarComponent },
    { path: 'inicio', component: InicioComponent }
];
