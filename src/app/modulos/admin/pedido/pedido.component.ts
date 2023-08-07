import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/servicios/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  //variables globales
  pedido: any;
  productos: any;
  idpedido:any;
  ped = {
    fecha: "",
    fo_cliente: 0,
    productos:[],
    subtotal:0,
    envio:0,
    total: 0,
    notas:""
  };
  pro = {
    productos: ""
  }
  //para validar
  validcliente = true;
  validproductos = true;
  
  beditar = false;
  datofiltro:any;

  constructor(private spedido: PedidoService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.spedido.consultar().subscribe((result:any) => {
      this.pedido = result;
      console.log(this.pedido);
    });
  }

  prod(id: any){
    console.clear();
    
    this.spedido.productos(id).subscribe((result:any) => {
      this.productos = result;
      console.log(this.productos);
    });
  }

  pregunta(id: any, nombre: any){
    //console.log("entro con el id " + id);
    Swal.fire({
      title: '¿Esta seguro de cancelar el pedido del cliente '+ nombre +'?',
      text: "El proceso no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelar(id);
        Swal.fire(
          'Eliminado',
          'El pedido ha sido eliminado.',
          'success'
        )
      }
    }) 
  }


  cancelar(id:any){
    this.spedido.cancelar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
  }

}
