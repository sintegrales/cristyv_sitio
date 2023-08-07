import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidoins',
  templateUrl: './pedidoins.component.html',
  styleUrls: ['./pedidoins.component.scss']
})
export class PedidoinsComponent implements OnInit {

  //variables globales

  
  fecha: any;
  fechaa: any;
  diaa: any;
  mesa: any;
  yeara: any;
  dsema: any;
  //clientes
  cliente: any;
  sclient:any;
  datoscli = ["", "", "",0];
  clientid: any = 0;
  ident = "";
  //productos
  producto: any;
  datop = "";
  sprod: any;
  arrprod: any = [];
  validprod = false;
  total: any;
  envio=10000;
  pedido = {
    fecha: "",
    fo_cliente: 0,
    productos: [],
    subtotal: 0,
    envio: 0,
    total: 0,
    notas: ""
  }


  constructor(private spedido: PedidoService, private scliente: ClienteService, private sproducto: ProductoService) { }

  ngOnInit(): void {
    this.fechaac();
    this.conclientes();
    this.conproducto();
  }

  //fecha actual
  fechaac(){
    const meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diass = ["", "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const f = new Date();
    this.yeara = f.getFullYear();
    this.diaa = f.getDate();
    this.mesa = f.getMonth() + 1; 
    this.dsema = f.getDay()+1;
    this.fechaa = `${this.yeara}-${this.mesa}-${this.diaa}`;
    let adia = "";
    
    if(this.diaa < 10){
      adia = "0"+this.diaa;
    }else{
      adia = `${this.diaa}`;
    }
    
    this.fecha = `${diass[this.dsema]}, ${adia} de ${meses[this.mesa]} de ${this.yeara}`;
    console.log(this.fecha);
  }

  //consultar lista clientes
  conclientes(){
    this.scliente.consultar().subscribe((result:any) => {
      this.cliente = result;
      //console.log(this.cliente);
    })
  }

  //buscar cliente
  bcliente(){
    //console.log(this.ident);
    if(this.ident==""){
      this.conclientes();
    }else{
      this.scliente.filtro(this.ident).subscribe((result:any) => {
        this.cliente = result;
        console.log(this.cliente);
      })
    }
  }

  //seleccionar cliente
  scli(ident: any){
    //console.log(ident);
    this.scliente.filtro(ident).subscribe((result:any) => {
      this.sclient = result;
      //console.log(this.sclient);
      this.datoscli[0] = `${this.sclient[0].nombre} Identificación: ${this.sclient[0].ident}`;
      this.datoscli[1] = `Direccion: ${this.sclient[0].direccion} ${this.sclient[0].ciudad}
                       ${this.sclient[0].dpto} `;
      this.datoscli[2] = `Celular: ${this.sclient[0].celular} Email: ${this.sclient[0].email}`;
      this.datoscli[3] = this.sclient[0].id_cliente;
      this.clientid = this.sclient[0].id_cliente;
    });
  }

  //consultar lista de productos
  conproducto(){
    this.sproducto.consultar().subscribe((result:any) => {
      this.producto = result;
      //console.log(this.producto);
    })
  } 

  bproducto(){
    //console.log(this.ident);
    if(this.datop==""){
      this.conproducto();
    }else{
      this.sproducto.filter(this.datop).subscribe((result:any) => {
        this.producto = result;
        //console.log(this.cliente);
      })
    }
  }

  async selproducto(idp:number){
    let idpp = Number(idp);
    let validar = false;
    let lar = this.arrprod.length;
    
    for(let c=0; c<lar; c++){
      validar = this.arrprod[c].includes(idpp, 0);
      /* console.clear();
      console.log(this.arrprod);
      console.log(idpp);
      console.log(c);
      console.log(validar); */
      if(validar==true){
        c=lar;
      }
    }
    console.clear();
    console.log(validar);
    if(validar==true){
      Swal.fire('El prodcuto ya fue agregado');
    }else{
      //let cantidad = Number(prompt("Cuantos va a llevar?"));
      const { value: cantidad } = await Swal.fire({
        title: 'Ingrese la cantidad a llevar',
        input: 'number',
        inputLabel: 'Cantidad',
        inputPlaceholder: 'Cantidad'
      })

      if (cantidad) {
        Swal.fire(`Cantidad a llevar: ${cantidad}`)
      }
      //this.arrprod = [];
      let largo = 0;
      this.total = 0;

      this.sproducto.consultaruno(idp).subscribe((result:any) => {
        this.sprod = result;

        this.arrprod.push([Number(idp), this.sprod[0].nombre, this.sprod[0].codigo, Number(this.sprod[0].precio), Number(cantidad), this.sprod[0].precio * cantidad]);
        largo = this.arrprod.length;
        //console.log(largo);
        for(let i=0; i<largo; i++){
          this.total += this.arrprod[i][5];
        }
        //console.log(this.producto);
      });
      console.log(this.arrprod);
      this.validprod = true;
    }
    
  }
  

  borrarpro(id: any){
    console.clear();
    /* console.log(this.arrprod);
    console.log(id); */
    let pos: any;
    let validar = false;
    let largo = this.arrprod.length;
    for(let i=0; i<largo; i++){
      validar = this.arrprod[i].includes(id, 0);
      if(validar==true){
        pos = i;
        i=largo;
      }
    }
    let vtotal = this.arrprod[pos][5];
    //console.log(pos);
    this.arrprod.splice(pos, 1);
    console.log(this.arrprod);
    this.total -= vtotal;
  }

  insertar(){
    this.pedido={
      fecha: this.fechaa,
      fo_cliente: this.clientid,
      productos: this.arrprod,
      subtotal: this.total,
      envio: this.envio,
      total: this.total + this.envio,
      notas: "-"
    }

    this.spedido.insertar(this.pedido).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
      }
    });
    //console.log(this.pedido);
    
  }

}
