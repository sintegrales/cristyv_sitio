import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //url='http://localhost/itspos/php/usuario/';
  url='https://cristyvariedades.com/php/usuario/';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  } 

  insertar(articulo:any) {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(articulo));    
  }

  eliminar(id:number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }
  
  edit(datos:any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));    
  }

  filter(dato:any){
    //console.log(`${this.url}filtro.php?dato=${dato}`);
    
    return this.http.get(`${this.url}filtro.php?dato=${dato}`);
  }
}
