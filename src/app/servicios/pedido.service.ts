import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url='https://cristyvariedades.com/php/controlador/pedido.php';
  urlc='https://cristyvariedades.com/php/controlador/cliente.php';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}?control=con`);
  } 
  
  insertar(pedido:any) {
    return this.http.post(`${this.url}?control=ins`, JSON.stringify(pedido));    
  }

  cancelar(id:number) {
    return this.http.get(`${this.url}?control=can&id=${id}`);
  }
  
  productos(id: any) {
    return this.http.get(`${this.url}?control=pro&id=${id}`);
  }
  
}
