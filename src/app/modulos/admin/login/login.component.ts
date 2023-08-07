import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  clave: any;
  usuario: any;
  error=false;
  user = {
    nombre: "",
    usuario:"",
    clave:"",
    tipo:""
  };

  constructor(private slogin:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  consulta(tecla: any) {
       
    if(tecla.keyCode == 13 || tecla == ''){
      this.slogin.consultar(this.email, this.clave).subscribe((result:any) => {
        this.usuario = result;
        console.log(this.usuario);
  
        if(this.usuario[0].validar == "valida"){
          console.log("entro");
          sessionStorage.setItem('id', this.usuario[0].id_user);
          sessionStorage.setItem('nombre', this.usuario[0].nombre);
          sessionStorage.setItem('perfil', this.usuario[0].rol);
          this.router.navigate(['dashboard']);
        }else{
          console.log("no entro");
          this.error=true;
        }
      })
    } 
    
  }

}
