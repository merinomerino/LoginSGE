import { Component, OnInit } from '@angular/core';
import { MaestrosService } from 'src/app/services/maestros.services';
import { MaestroModel } from 'src/app/models/maestro.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})


export class MaestrosComponent implements OnInit {

  maestros: MaestroModel[] = [];
  cargando = false;


  

  constructor( private maestrosService: MaestrosService ) { }

  ngOnInit() {

    this.cargando = true;
    this.maestrosService.getMaestros()
      .subscribe( (resp:any) => {
        this.maestros = resp;
        this.cargando = false;
      });

  }

  borrarMaestro( maestro: MaestroModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ maestro.nombre_maestro }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.maestros.splice(i, 1);
        this.maestrosService.borrarMaestro( maestro.id ).subscribe();
      }

    });

  }

}
