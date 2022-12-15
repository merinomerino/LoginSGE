import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarreraModel } from 'src/app/models/carrera.model';
import { map, delay } from 'rxjs/operators';

interface Person {
  id: string;
  nombre_carrera: string;
  nombre_corto: string;
  nombre_abreviado: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {


  private url = 'https://loginapp-76395-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearCarrera( carrera: CarreraModel ) {

    return this.http.post(`${ this.url }/carreras.json`, carrera)
            .pipe(
              map( (resp: any) => {
                carrera.id = resp.name;
                return carrera;
              })
            );

  }

  actualizarCarrera( carrera: CarreraModel ) {

    const carreraTemp = {
      ...carrera
    };

 
    return this.http.put(`${ this.url }/carreras/${ carrera.id }.json`, carreraTemp);


  }

  borrarCarrera( id: string ) {

    return this.http.delete(`${ this.url }/carreras/${ id }.json`);

  }


  getCarrera( id: string ) {

    return this.http.get(`${ this.url }/carreras/${ id }.json`);

  }


  getCarreras() {
    return this.http.get(`${ this.url }/carreras.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( carrerasObj: any ) {

    const carreras: CarreraModel[] = [];

    Object.keys( carrerasObj ).forEach( key => {

      const carrera: CarreraModel = carrerasObj[key];
      carrera.id = key;

      carreras.push( carrera );
    });


    return carreras;

  }


}
