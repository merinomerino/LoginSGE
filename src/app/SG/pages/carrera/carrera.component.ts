import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import { CarreraModel } from 'src/app/models/carrera.model';

import { CarrerasService } from 'src/app/services/carreras.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  carrera: CarreraModel = new CarreraModel();


  constructor( private carrerasService: CarrerasService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.carrerasService.getCarrera( id )
      .subscribe( (resp: any) => {
        this.carrera = resp;
        this.carrera.id = id;
      });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton:false,
    });
    Swal.showLoading(Swal.getDenyButton());


    let peticion: Observable<any>;

    if ( this.carrera.id ) {
      peticion = this.carrerasService.actualizarCarrera( this.carrera );
    } else {
      peticion = this.carrerasService.crearCarrera( this.carrera );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.carrera.nombre_carrera,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
