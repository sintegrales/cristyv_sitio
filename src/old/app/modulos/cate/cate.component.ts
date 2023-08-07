import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.scss']
})
export class CateComponent implements OnInit {

  //variables globales
  verf = false;
  catego: any;
  idcate:any;
  cate = {
    categoria: ""
  };
  //para validar
  validcate = true;
  beditar = false;
  datofiltro:any;
  Noreg: any;
  totalreg:any;
  limite = 0;
  nobloque: any;
  conbloque=1;
  n:any;
  navegador=true;

  constructor(private scate:CategoriaService, private router:Router) { }

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
        this.idcate = "";
        this.limpiar();
      break;
      case 1: 
        this.verf = true;
      break;
    }  
  }

  //limpiar
  limpiar(){
    this.cate.categoria = "";
  }

  //validar
  validar(){
    if(this.cate.categoria == ""){
      this.validcate = false;
    }else{
      this.validcate = true;
    }
    
  }

  consulta() {
    this.scate.consultar(this.limite).subscribe((result:any) => {
      this.catego = result;
      //console.log(this.usuario);
    });

    this.scate.contar().subscribe((result:any) => {
      this.Noreg = result;
      
      this.totalreg = this.Noreg.conteo;
      this.nobloque = Math.trunc(this.totalreg/5);
      this.n=[];
      for(let i=1; i<=(this.nobloque+1); i++){
        this.n.push(i);
      }
      
      console.log(this.n);
    });
    
  }

  ingresar() {
    //console.log(this.cat);
    this.validar();
    
    if(this.validcate==true){
      this.scate.insertar(this.cate).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
    
  }

  pregunta(id: any, dato: any){
    console.log("entro con el id " + id);
    Swal.fire({
      title: '¿Esta seguro de eliminar la categoria '+ dato +'?',
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
          'La categoría ha sido eliminada.',
          'success'
        )
      }
    }) 
  }


  borrarusuario(id:any){
    this.scate.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }
  
  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.cate.categoria = datos.categoria;
    this.idcate = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.user);
    this.validar();
    
    if(this.validcate==true){
      this.scate.edit(this.cate, this.idcate).subscribe((datos:any) => {
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
    
    this.scate.filter(this.datofiltro).subscribe((result:any) => {
      this.catego = result;
      console.log(this.catego);
    })  
    
    this.scate.filtercon(this.datofiltro).subscribe((result:any) => {
      this.Noreg = result;
      console.log(this.Noreg.conteo);
      this.totalreg = this.Noreg.conteo;
    });

    this.navegador=false;
  }

  primerlimite(){
    this.limite = 0;
    this.consulta();
  }
  bajarlimite(){
    console.log(this.conbloque + " - " + this.nobloque);
    if(this.conbloque < 0){
      this.conbloque = 1;
    }else{
      this.limite = this.limite - 5;
      this.conbloque = this.conbloque - 1;
      this.consulta();
    }
    
  }
  aumentarlimite(){
    console.log(this.conbloque + " - " + this.nobloque);
    
    if(this.conbloque <= this.nobloque){
      this.limite = this.limite + 5;
      this.conbloque = this.conbloque + 1;
      this.consulta();
    }
    
  }
  finallimite(){
    this.limite = (this.nobloque*5);
    console.log(this.limite);
    this.consulta();
  }
  
  llegar(dato:any){
    this.limite = ((dato-1)*5);
    console.log(this.limite);
    this.consulta();
  }

  refresh(): void { window.location.reload(); }

}
