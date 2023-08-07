import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/servicios/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  //variables globales
  verf = false;
  vent: any;
  idcate:any;
  venta = {
    fecha: "",
    id_cliente: 0,
    productos: [],
    subtotal: 0,
    impuesto: 0,
    total: 0,
    metodo_pago: "",
    id_usuario: 0
  };
  //para validar
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

  constructor(private sventa:VentaService) { }

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
    
    this.venta.fecha= "";
    this.venta.id_cliente= 0;
    this.venta.productos= [];
    this.venta.subtotal= 0;
    this.venta.impuesto= 0;
    this.venta.total= 0;
    this.venta.metodo_pago= "";
    this.venta.id_usuario= 0;
  }

  //validar
  validar(){
    if(this.venta.fecha == ""){
      this.validventa = false;
    }else{
      this.validventa = true;
    }
    
  }

  consulta() {
    this.sventa.consultar(this.limite).subscribe((result:any) => {
      this.vent = result;
      //console.log(this.usuario);
    });

    this.sventa.contar().subscribe((result:any) => {
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
