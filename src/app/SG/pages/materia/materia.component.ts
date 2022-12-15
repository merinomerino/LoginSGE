import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import { MateriaModel } from 'src/app/models/materia.model';

import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  materia: MateriaModel = new MateriaModel();


  constructor( private materiasService: MateriasService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = ''+this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.materiasService.getMateria( id )
      .subscribe( (resp: any) => {
        this.materia = resp;
        this.materia.id = id;
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

    if ( this.materia.id ) {
      peticion = this.materiasService.actualizarMateria( this.materia );
    } else {
      peticion = this.materiasService.crearMateria( this.materia );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.materia.nombre_materia,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
