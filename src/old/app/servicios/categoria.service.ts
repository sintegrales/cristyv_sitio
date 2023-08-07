import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  //url='http://localhost/itspos/php/categoria/';
  url='https://cristyvariedades.com/php/categoria/';

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

  eliminar(id:number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }
  
  edit(datos:any, id:number) {
    return this.http.post(`${this.url}editar.php?id=${id}`, JSON.stringify(datos));    
  }

  filter(dato:any){
    return this.http.get(`${this.url}filtro.php?dato=${dato}`);
  }

  filtercon(dato:any){
    return this.http.get(`${this.url}filtrocon.php?dato=${dato}`);
  }


}


