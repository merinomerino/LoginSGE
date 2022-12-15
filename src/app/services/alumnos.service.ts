import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnoModel } from 'src/app/models/alumno.model';
import { map, delay } from 'rxjs/operators';

interface Person {
  id: string;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  private url = 'https://loginapp-76395-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearAlumno( alumno: AlumnoModel ) {

    return this.http.post(`${ this.url }/alumnos.json`, alumno)
            .pipe(
              map( (resp: any) => {
                alumno.id = resp.name;
                return alumno;
              })
            );

  }

  actualizarAlumno( alumno: AlumnoModel ) {

    const alumnoTemp = {
      ...alumno
    };

 
    return this.http.put(`${ this.url }/alumnos/${ alumno.id }.json`, alumnoTemp);


  }

  borrarAlumno( id: string ) {

    return this.http.delete(`${ this.url }/alumnos/${ id }.json`);

  }


  getAlumno( id: string ) {

    return this.http.get(`${ this.url }/alumnos/${ id }.json`);

  }


  getAlumnos() {
    return this.http.get(`${ this.url }/alumnos.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( alumnosObj: any ) {

    const alumnos: AlumnoModel[] = [];

    Object.keys( alumnosObj ).forEach( key => {

      const alumno: AlumnoModel = alumnosObj[key];
      alumno.id = key;

      alumnos.push( alumno );
    });


    return alumnos;

  }


}
