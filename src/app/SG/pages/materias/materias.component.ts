import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias.service';
import { MateriaModel } from 'src/app/models/materia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})


export class MateriasComponent implements OnInit {

  materias: MateriaModel[] = [];
  cargando = false;


  

  constructor( private materiasService: MateriasService ) { }

  ngOnInit() {

    this.cargando = true;
    this.materiasService.getMaterias()
      .subscribe( (resp:any) => {
        this.materias = resp;
        this.cargando = false;
      });

  }

  borrarMateria( materia: MateriaModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ materia.nombre_materia }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.materias.splice(i, 1);
        this.materiasService.borrarMateria( materia.id ).subscribe();
      }

    });

  }

}
