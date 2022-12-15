import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import { MaestroModel } from 'src/app/models/maestro.model';

import { MaestrosService } from 'src/app/services/maestros.services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.css']
})
export class MaestroComponent implements OnInit {

  maestro: MaestroModel = new MaestroModel();


  constructor( private maestrosService: MaestrosService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.maestrosService.getMaestro( id )
      .subscribe( (resp: any) => {
        this.maestro = resp;
        this.maestro.id = id;
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

    if ( this.maestro.id ) {
      peticion = this.maestrosService.actualizarMaestro( this.maestro );
    } else {
      peticion = this.maestrosService.crearMaestro( this.maestro );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.maestro.nombre_maestro,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
