import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CarreraModel } from 'src/app/models/carrera.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})


export class CarrerasComponent implements OnInit {

  carreras: CarreraModel[] = [];
  cargando = false;


  

  constructor( private carrerasService: CarrerasService ) { }

  ngOnInit() {

    this.cargando = true;
    this.carrerasService.getCarreras()
      .subscribe( (resp:any) => {
        this.carreras = resp;
        this.cargando = false;
      });

  }

  borrarCarrera( carrera: CarreraModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ carrera.nombre_carrera }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.carreras.splice(i, 1);
        this.carrerasService.borrarCarrera( carrera.id ).subscribe();
      }

    });

  }

}
