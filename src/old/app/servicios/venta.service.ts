import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  //url='http://localhost/itspos/php/ventas/';
  url='https://cristyvariedades.com/php/ventas/';

  constructor(private http:HttpClient) { }

  consultar(limite: any) {
    return this.http.get(`${this.url}consulta.php?limite=${limite}`);
  } 

  contar(){
    return this.http.get(`${this.url}contar.php`);
  }

  insertar(datos:any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(datos));    
  }

  /////////consultar productos
  consultarp(limite: any) {
    return this.http.get(`${this.url}consultap.php?limite=${limite}`);
  }

  contarp(){
    return this.http.get(`${this.url}contarp.php`);
  }
}
