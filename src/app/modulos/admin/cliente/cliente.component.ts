import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  //variables globales
  verf = false;
  cliente: any;
  dpto: any;
  ciudad: any;
  idcliente:any;
  cli = {
    ident: "",
    nombre: "",
    email:"",
    celular:"",
    direccion:"",
    iddpto: 0,
    fo_ciudad:0
  };
  //para validar
  validident = true;
  validnombre = true;
  validemail = true;
  validcelular = true;
  validdireccion = true;
  validdpto = true;
  validciudad = true;
  beditar = false;
  datofiltro:any;

  constructor(private scliente: ClienteService) { }

  ngOnInit(): void {
    this.consulta();
    this.cdpto();
  }

  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idcliente = "";
        this.limpiar();
      break;
      case 1: 
        this.verf = true;
      break;
    }  
  }

  //limpiar
  limpiar(){
    this.cli.ident = "";
    this.cli.nombre = "";
    this.cli.email = "";
    this.cli.celular= "";
    this.cli.direccion = "";
    this.cli.fo_ciudad = 0;
    this.cli.iddpto = 0;
  }

  //validar
  validar(){
       
    if(this.cli.ident == ""){
      this.validident = false;
    }else{
      this.validident = true;
    }

    if(this.cli.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }
    
    if(this.cli.email == ""){
      this.validemail = false;
    }else{
      this.validemail = true;
    }

    if(this.cli.celular == ""){
      this.validcelular = false;
    }else{
      this.validcelular = true;
    }

    if(this.cli.direccion == ""){
      this.validdireccion = false;
    }else{
      this.validdireccion = true;
    }

    if(this.cli.fo_ciudad == 0){
      this.validciudad = false;
    }else{
      this.validciudad = true;
    }

    if(this.cli.iddpto == 0){
      this.validdpto = false;
    }else{
      this.validdpto = true;
    }

    if(this.cli.fo_ciudad == 0){
      this.validciudad = false;
    }else{
      this.validciudad = true;
    }

    console.log(this.validnombre);
  }

  consulta() {
    this.scliente.consultar().subscribe((result:any) => {
      this.cliente = result;
      //console.log(this.usuario);
    })
    
  }

  ingresar() {
    //console.log(this.cli);
    this.validar();
    
    if(this.validident==true && this.validnombre==true && this.validemail==true && this.validcelular==true && this.validdireccion==true && this.validdpto==true && this.validciudad==true){
      this.scliente.insertar(this.cli).subscribe((datos:any) => {
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
    //console.log("entro con el id " + id);
    Swal.fire({
      title: '¿Esta seguro de eliminar el cliente '+ nombre +'?',
      text: "El proceso no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrar(id);
        Swal.fire(
          'Eliminado',
          'El cliente ha sido eliminado.',
          'success'
        )
      }
    }) 
  }


  borrar(id:any){
    this.scliente.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }
  
  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.cli.ident = datos.ident;
    this.cli.nombre = datos.nombre;
    this.cli.email = datos.email;
    this.cli.celular = datos.celular;
    this.cli.direccion = datos.direccion;
    this.cli.iddpto = datos.fo_dpto;
    this.cciudad();
    this.cli.fo_ciudad = datos.fo_ciudad;

    this.idcliente = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.user);
    this.validar();
    
    if(this.validident==true && this.validnombre==true && this.validemail==true && this.validcelular==true && this.validdireccion==true && this.validdpto==true && this.validciudad==true){
      this.scliente.edit(this.cli, this.idcliente).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

  cdpto(){
    this.scliente.condpto().subscribe((result:any) => {
      this.dpto = result;
      //console.log(this.usuario);
    })
  }

  cciudad(){
    this.scliente.conciudad(this.cli.iddpto).subscribe((result:any) => {
      this.ciudad = result;
      //console.log(this.usuario);
    })    
  }

}
