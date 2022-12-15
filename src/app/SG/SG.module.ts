import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CarrerasComponent } from './pages/carreras/carreras.component';
import { MaestrosComponent } from './pages/maestros/maestros.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { RouterModule } from '@angular/router';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { MaestroComponent } from './pages/maestro/maestro.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AlumnoComponent,
    AlumnosComponent,

    CarrerasComponent,
    CarreraComponent,

    MaestroComponent,
    MaestrosComponent,

    MateriaComponent,
    MateriasComponent
  ],
  exports:[

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class PaisModule { }