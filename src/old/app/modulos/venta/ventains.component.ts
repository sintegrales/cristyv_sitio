import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/servicios/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventains',
  templateUrl: './ventains.component.html',
  styleUrls: ['./ventains.component.scss']
})
export class VentainsComponent implements OnInit {

  product: any;
  Noreg: any;
  totalreg: any;
  nobloque: any;
  n: any;
  limite = 0;
  conbloque = 1;
  cantidad = 0;
  p = [];
  arr: any;
  venta = [];

  constructor(private sventa:VentaService) { }

  ngOnInit(): void {
    this.consultap();
  }

  ///productos
  consultap() {
    this.sventa.consultarp(this.limite).subscribe((result:any) => {
      this.product = result;
      //console.log(this.usuario);
    });

    this.sventa.contarp().subscribe((result:any) => {
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

  primerlimite(){
    this.limite = 0;
    this.consultap();
  }
  bajarlimite(){
    console.log(this.conbloque + " - " + this.nobloque);
    if(this.conbloque < 0){
      this.conbloque = 1;
    }else{
      this.limite = this.limite - 5;
      this.conbloque = this.conbloque - 1;
      this.consultap();
    }
    
  }
  aumentarlimite(){
    console.log(this.conbloque + " - " + this.nobloque);
    
    if(this.conbloque <= this.nobloque){
      this.limite = this.limite + 5;
      this.conbloque = this.conbloque + 1;
      this.consultap();
    }
    
  }
  finallimite(){
    this.limite = (this.nobloque*5);
    console.log(this.limite);
    this.consultap();
  }
  
  llegar(dato:any){
    this.limite = ((dato-1)*5);
    console.log(this.limite);
    this.consultap();
  }

  refresh(): void { window.location.reload(); }

  ///// fin productos

  capturar(prod: any){
    //console.log(dato);
    let cant = Number(prompt('ingrese cantidad'));
    //console.log(cant);
    let subtotal = prod.precio_venta * cant;
    let arreglo = [];
    this.arr = {
      codigo: prod.codigo, 
      nombre: prod.nombre, 
      precio_venta: prod.precio_venta, 
      cantidad: cant, 
      subtotal: subtotal
    }
    
    arreglo.push(this.arr);
    

    console.log(this.arr);
    
    //this.p.push(this.arr);

    /* this.prueba.productos=this.p;
    console.log(this.prueba); */


    /* this.sventa.insertar(this.prueba).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        //this.consulta();
      }
    }); */
  }

}
