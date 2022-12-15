import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MateriaModel } from 'src/app/models/materia.model';
import { map, delay } from 'rxjs/operators';

interface Person {
  id: string;
  nombre_materia: string;
  nombre_corto: string;
  nombre_abreviado: string;
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {


  private url = 'https://loginapp-76395-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearMateria( materia: MateriaModel ) {

    return this.http.post(`${ this.url }/materias.json`, materia)
            .pipe(
              map( (resp: any) => {
                materia.id = resp.name;
                return materia;
              })
            );

  }

  actualizarMateria( materia: MateriaModel ) {

    const materiaTemp = {
      ...materia
    };

 
    return this.http.put(`${ this.url }/materias/${ materia.id }.json`, materiaTemp);


  }

  borrarMateria( id: string ) {

    return this.http.delete(`${ this.url }/materias/${ id }.json`);

  }


  getMateria( id: string ) {

    return this.http.get(`${ this.url }/materias/${ id }.json`);

  }


  getMaterias() {
    return this.http.get(`${ this.url }/materias.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( materiasObj: any ) {

    const materias: MateriaModel[] = [];

    Object.keys( materiasObj ).forEach( key => {

      const materia: MateriaModel = materiasObj[key];
      materia.id = key;

      materias.push( materia );
    });


    return materias;

  }


}
