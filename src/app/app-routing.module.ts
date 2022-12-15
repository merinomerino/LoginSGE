import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AlumnosComponent } from './SG/pages/alumnos/alumnos.component';
import { AlumnoComponent } from './SG/pages/alumno/alumno.component';
import { CarreraComponent } from './SG/pages/carrera/carrera.component';
import { CarrerasComponent } from './SG/pages/carreras/carreras.component';
import { MaestroComponent } from './SG/pages/maestro/maestro.component';
import { MaestrosComponent } from './SG/pages/maestros/maestros.component';
import { MateriaComponent } from './SG/pages/materia/materia.component';
import { MateriasComponent } from './SG/pages/materias/materias.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnosComponent ,canActivate:[AuthGuard]},
  { path: 'alumno/:id', component: AlumnoComponent  ,canActivate:[AuthGuard]},
  //{ path: '**', pathMatch: 'full', redirectTo: '' },
  
  { path:'carreras', component: CarrerasComponent ,canActivate:[AuthGuard]},
  { path:'carrera/:id',component: CarreraComponent ,canActivate:[AuthGuard]},
  //{ path: '**', pathMatch: 'full', redirectTo: '' },

  { path:'maestros', component: MaestrosComponent ,canActivate:[AuthGuard]},
  { path:'maestro/:id',component: MaestroComponent ,canActivate:[AuthGuard]},
  //{ path: '**', pathMatch: 'full', redirectTo: '' },

  { path:'materias', component: MateriasComponent ,canActivate:[AuthGuard]},
  { path:'materia/:id',component: MateriaComponent ,canActivate:[AuthGuard]},
  //{ path: '**', pathMatch: 'full', redirectTo: '' },
  { path: 'home'    , component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
