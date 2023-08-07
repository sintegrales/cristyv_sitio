import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  //variables globales
  verf = false;
  usuario: any;
  iduser:any;
  user = {
    nombre: "",
    email:"",
    clave:"",
    rol:"",
    estado:""
  };
  //para validar
  validnombre = true;
  validemail = true;
  validclave = true;
  validrol = true;
  beditar = false;
  datofiltro:any;

  constructor(private suser: UsuarioService) { }

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.iduser = "";
        this.limpiar();
      break;
      case 1: 
        this.verf = true;
      break;
    }  
  }

  //limpiar
  limpiar(){
    this.user.nombre = "";
    this.user.email = "";
    this.user.clave= "";
    this.user.rol = "";
    this.user.estado = "";
  }

  //validar
  validar(){
        
    if(this.user.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }
    
    if(this.user.email == ""){
      this.validemail = false;
    }else{
      this.validemail = true;
    }

    if(this.user.clave == ""){
      this.validclave = false;
    }else{
      this.validclave = true;
    }

    if(this.user.rol == ""){
      this.validrol = false;
    }else{
      this.validrol = true;
    }

    console.log(this.validnombre);
  }

  consulta() {
    this.suser.consultar().subscribe((result:any) => {
      this.usuario = result;
      //console.log(this.usuario);
    })
    
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();
    
    if(this.validnombre==true && this.validemail==true && this.validclave==true && this.validrol==true){
      this.suser.insertar(this.user).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
    
  }

  pregunta(id: any, nombre: any){
    console.log("entro con el id " + id);
    Swal.fire({
      title: '¿Esta seguro de eliminar el usuario '+ nombre +'?',
      text: "El proceso no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarusuario(id);
        Swal.fire(
          'Eliminado',
          'el usuario ha sido eliminado.',
          'success'
        )
      }
    }) 
  }


  borrarusuario(id:any){
    this.suser.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }
  
  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.user.nombre = datos.nombre;
    this.user.email = datos.email;
    this.user.clave = datos.clave;
    this.user.rol = datos.rol;
    this.iduser = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.user);
    this.validar();
    
    if(this.validnombre==true && this.validemail==true && this.validclave==true && this.validrol==true){
      this.suser.edit(this.user, this.iduser).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

  filtro(){
    console.log(this.datofiltro);
    
    this.suser.filter(this.datofiltro).subscribe((result:any) => {
      this.usuario = result;
      console.log(this.usuario);
    })   
  }

}
