import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaestroModel } from 'src/app/models/maestro.model';
import { map, delay } from 'rxjs/operators';

interface Person {
  id: string;
  nombre_maestro: string;
  departamento_asig: string;
  cargo: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {


  private url = 'https://loginapp-76395-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearMaestro( maestro: MaestroModel ) {

    return this.http.post(`${ this.url }/maestros.json`, maestro)
            .pipe(
              map( (resp: any) => {
                maestro.id = resp.name;
                return maestro;
              })
            );

  }

  actualizarMaestro( maestro: MaestroModel ) {

    const maestroTemp = {
      ...maestro
    };

 
    return this.http.put(`${ this.url }/maestros/${ maestro.id }.json`, maestroTemp);


  }

  borrarMaestro( id: string ) {

    return this.http.delete(`${ this.url }/maestros/${ id }.json`);

  }


  getMaestro( id: string ) {

    return this.http.get(`${ this.url }/maestros/${ id }.json`);

  }


  getMaestros() {
    return this.http.get(`${ this.url }/maestros.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }



  private crearArreglo( MaestrosObj: any ) {

    const maestros: MaestroModel[] = [];

    Object.keys( MaestrosObj ).forEach( key => {

      const alumno: MaestroModel = MaestrosObj[key];
      alumno.id = key;

      maestros.push( alumno );
    });


    return maestros;

  }


}
