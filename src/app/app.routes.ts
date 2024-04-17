import { Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DetallepComponent } from './components/detallep/detallep.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { RegistropagoComponent } from './components/registropago/registropago.component';

import { GraficasdashComponent } from './components/componentsDashboard/graficasdash/graficasdash.component';
import { Component } from '@angular/core';
import { PersonasReDashComponent } from './components/componentsDashboard/personas-re-dash/personas-re-dash.component';
import { PagosReaDashComponent } from './components/componentsDashboard/pagos-rea-dash/pagos-rea-dash.component';
import { VerificarPaDashComponent } from './components/componentsDashboard/verificar-pa-dash/verificar-pa-dash.component';

export const routes: Routes = [
 
    { path: '', redirectTo: '/inicio', pathMatch:'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'detalle', component: DetallepComponent },
    { path: 'registropago', component: RegistropagoComponent },
    { path: 'administracion', component: AdministracionComponent },

    { path: 'graficas', component:GraficasdashComponent},
    { path: 'personas',component: PersonasReDashComponent},
    { path: 'pagos', component: PagosReaDashComponent},
    { path: 'verificar', component: VerificarPaDashComponent}

];
