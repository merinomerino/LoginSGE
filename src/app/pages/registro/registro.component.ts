import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario!:UsuarioModel ;
  recordarme=false;

  constructor(
    private auth:AuthService,
    private router:Router
    ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    
  }

  onSubmit( form : NgForm ){
    if(form.invalid){ return }
    // console.log('Formulario enviado')
    // console.table(this.usuario);
    // console.log(form)
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor',
      showConfirmButton:false,
    })
    Swal.showLoading(Swal.getDenyButton());


    this.auth.nuevoUsuario(this.usuario)
     .subscribe(resp=>{
      console.log(resp)
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email)
      }
      this.router.navigateByUrl('/home')
     },(err)=>{
      console.log(err.error.error.message)
      Swal.fire({
        icon:'error',
        title:'Error al Autentificar',
        text:err.error.error.message
      })
    })
  }


}
