import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='https://identitytoolkit.googleapis.com/v1/accounts:'
  private apikey='AIzaSyCypmABeYjrk8hSxV6v2IB7Yh_dC30pRv8';
  userToken!:string;
  //crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  login(usuario:UsuarioModel){
    const authData={
      ...usuario,
      returnSecureToken:true,
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp:any)=>{
        // console.log('entro en el map del RXJS');
        // console.log(resp)
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
  }

  logout(){
      localStorage.removeItem('token')
  }

  nuevoUsuario(usuario:UsuarioModel){
    const authData={
      ...usuario,
      returnSecureToken:true,
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    )

  }

  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token',idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken=''+localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  estaAutentificado():boolean{
    if(this.userToken.length < 2 ){
      return false
    }
    return true;
  }
}
