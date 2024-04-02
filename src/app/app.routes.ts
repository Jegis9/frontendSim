import { Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DetallepComponent } from './components/detallep/detallep.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { RegistropagoComponent } from './components/registropago/registropago.component';

export const routes: Routes = [
 
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'detalle', component: DetallepComponent },
    { path: 'registropago', component: RegistropagoComponent },
    { path: 'administracion', component: AdministracionComponent },


];
