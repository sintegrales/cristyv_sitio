import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url='https://cristyvariedades.com/php/controlador/marca.php';

  constructor(private http:HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}?control=con`);
  }  

  insertar(articulo:any) {
    return this.http.post(`${this.url}?control=ins`, JSON.stringify(articulo));    
  }

  eliminar(id:number) {
    return this.http.get(`${this.url}?control=del&id=${id}`);
  }
  
  edit(datos:any, id:number) {
    return this.http.post(`${this.url}?control=edi&id=${id}`, JSON.stringify(datos));    
  }

  filter(dato:any){
    //console.log(`${this.url}filtro.php?dato=${dato}`);
    
    return this.http.get(`${this.url}?control=fil&dato=${dato}`);
  }

}
