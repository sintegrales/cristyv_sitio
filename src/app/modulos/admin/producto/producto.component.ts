import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CateService } from 'src/app/servicios/cate.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  //variables globales
  verf = false;
  producto: any;
  cate: any;
  marca: any;
  idprod:any;
  prod = {
    codigo: "",
    nombre: "",
    fo_cate: 0,
    fo_marca: 0,
    precio: 0,
    descripcion: "", 
    promo: "NO"
  };
  imagenes: any;
  img: any;
  limite = 0;
  //para validar
  validcodigo = true;
  validnombre = true;
  validcate = true;
  validmarca = true;
  validprecio = true;
  validdescri = true;
  beditar = false;
  datofiltro:any;

  //frames
  idimg = 1;
  url = `https://cristyvariedades.com/cristyv/php/producto/subirimg.php?id=${this.idimg}`;
  urlframe: SafeResourceUrl | undefined;  

  constructor(private sproducto: ProductoService, private scate: CateService, private smarca: MarcaService, private sanitazer: DomSanitizer) { }

  ngOnInit(): void {
    this.consulta();
    this.consulta_c();
    this.consulta_m();
    this.limpiar();
    this.urlframe = this.sanitazer.bypassSecurityTrustResourceUrl(this.url);
  }

  //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idprod = "";
        this.limpiar();
      break;
      case 1: 
        this.verf = true;
      break;
    }  
  }

  //limpiar
  limpiar(){
    this.prod.codigo = "";
    this.prod.nombre = "";
    this.prod.fo_cate = 0;
    this.prod.fo_marca= 0;
    this.prod.precio = 0;
    this.prod.descripcion = "";
  }

  //validar
  validar(){
        
    if(this.prod.codigo == ""){
      this.validcodigo = false;
    }else{
      this.validcodigo = true;
    }

    if(this.prod.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }
    
    if(this.prod.fo_cate == 0){
      this.validcate = false;
    }else{
      this.validcate = true;
    }

    if(this.prod.fo_marca == 0){
      this.validmarca = false;
    }else{
      this.validmarca = true;
    }

    if(this.prod.precio == 0){
      this.validprecio = false;
    }else{
      this.validprecio = true;
    }

    if(this.prod.descripcion == ""){
      this.validdescri = false;
    }else{
      this.validdescri = true;
    }

    //console.log(this.validnombre);
  }

  consulta() {
    this.sproducto.consultar().subscribe((result:any) => {
      this.producto = result;
      console.log(this.producto);
    })
    
  }

  consulta_c() {
    this.scate.consultar().subscribe((result:any) => {
      this.cate = result;
      //console.log(this.usuario);
    })
    
  }

  consulta_m() {
    this.smarca.consultar().subscribe((result:any) => {
      this.marca = result;
      //console.log(this.usuario);
    })
    
  }


  ingresar() {
    //console.log(this.cat);
    this.validar();
    
    if(this.validcodigo==true && this.validnombre==true && this.validcate==true && this.validmarca==true && this.validprecio==true && this.validdescri==true){
      this.sproducto.insertar(this.prod).subscribe((datos:any) => {
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
      title: '¿Esta seguro de eliminar el producto '+ nombre +'?',
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
          'El Producto ha sido eliminado.',
          'success'
        )
      }
    }) 
  }


  borrar(id:any){
    this.sproducto.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.prod.codigo = datos.codigo;
    this.prod.nombre = datos.nombre;
    this.prod.fo_cate = Number(datos.fo_cate);
    this.prod.fo_marca = Number(datos.fo_marca);
    this.prod.precio = Number(datos.precio);
    this.prod.descripcion = datos.descripcion;
    this.prod.promo = datos.promo;

    this.idprod = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.user);
    this.validar();
    
    if(this.validcodigo==true && this.validnombre==true && this.validcate==true && this.validmarca==true && this.validprecio==true && this.validdescri==true){
      this.sproducto.edit(this.prod, this.idprod).subscribe((datos:any) => {
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
    
    this.sproducto.filter(this.datofiltro).subscribe((result:any) => {
      this.producto = result;
      console.log(this.producto);
    })   
  }

  cargarurl(id: any){
    //console.log(id);
    this.idimg = id;
    this.url = `https://cristyvariedades.com/cristyv/php/producto/subirimg.php?id=${this.idimg}`;
    //console.log(this.url);
    this.urlframe = this.sanitazer.bypassSecurityTrustResourceUrl(this.url);
  }
  
  verimg(id: number){
    this.sproducto.veri(id).subscribe((result:any) => {
      this.imagenes = result;
      this.img = this.imagenes.imagenes.split(',');
      //console.log(this.img);
      //console.log(this.imagenes);
    })
  }
  
}
