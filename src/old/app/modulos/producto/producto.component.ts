import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria.service';
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
  prod: any;
  cate:any;
  idprod:any;
  producto = {
    id_categoria: 0,
    codigo: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    stock: 0,
    precio_compra: 0,
    precio_venta: 0
  };
  //para validar
  validcate = true;
  validcodigo = true;
  validnombre = true;
  validstock = true;
  validcompra = true;
  validventa = true;
  beditar = false;
  datofiltro:any;
  Noreg: any;
  totalreg:any;
  limite = 0;
  nobloque: any;
  conbloque=1;
  n:any;
  navegador=true;

  constructor(private sproducto: ProductoService, private router:Router) { }

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
    this.consultar_cate();
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
    this.producto = {
    id_categoria: 0,
    codigo: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    stock: 0,
    precio_compra: 0,
    precio_venta: 0
  };
  }

  //validar
  validar(){
    if(this.producto.id_categoria == 0){
      this.validcate = false;
    }else{
      this.validcate = true;
    }

    if(this.producto.codigo == ""){
      this.validcodigo = false;
    }else{
      this.validcodigo = true;
    }

    if(this.producto.nombre == ""){
      this.validnombre = false;
    }else{
      this.validnombre = true;
    }

    if(this.producto.precio_compra == 0){
      this.validcompra = false;
    }else{
      this.validcompra = true;
    }

    if(this.producto.precio_venta == 0){
      this.validventa = false;
    }else{
      this.validventa = true;
    }
    
  }

  consulta() {
    this.sproducto.consultar(this.limite).subscribe((result:any) => {
      this.prod = result;
      //console.log(this.usuario);
    });

    this.sproducto.contar().subscribe((result:any) => {
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

  consultar_cate(){
    this.sproducto.ccate().subscribe((result:any) => {
      this.cate = result;
      //console.log(this.usuario);
    });
  }

  ingresar() {
    console.log(this.producto);
    this.validar();
    
    if(this.validcate==true && this.validcodigo==true && this.validnombre==true && this.validcompra==true && this.validventa==true){
      this.sproducto.insertar(this.producto).subscribe((datos:any) => {
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
      title: '¿Esta seguro de eliminar el prodcuto '+ dato +'?',
      text: "El proceso no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarprod(id);
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado.',
          'success'
        )
      }
    }) 
  }


  borrarprod(id:any){
    this.sproducto.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }
  
  cargardatos(datos:any, id:number){
    //console.log(datos);
    this.producto.id_categoria = datos.id_categoria;
    this.producto.codigo = datos.codigo;
    this.producto.nombre = datos.nombre;
    this.producto.descripcion = datos.descripcion;
    this.producto.imagen = datos.imagen;
    this.producto.stock = datos.stock;
    this.producto.precio_compra = datos.precio_compra;
    this.producto.precio_venta = datos.precio_venta;
    this.idprod = id;
    this.mostrar(1);
    this.beditar=true;
  }

  editar(){
    //console.log(this.user);
    this.validar();
    
    if(this.validcodigo==true && this.validnombre==true && this.validstock==true && this.validcompra==true && this.validventa==true){
      this.sproducto.edit(this.producto, this.idprod).subscribe((datos:any) => {
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
      this.prod = result;
      console.log(this.prod);
    })  
    
    this.sproducto.filtercon(this.datofiltro).subscribe((result:any) => {
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
