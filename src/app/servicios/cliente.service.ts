import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url='https://cristyvariedades.com/php/controlador/cliente.php';

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

  filtro(dato: any){
    return this.http.get(`${this.url}?control=coni&ident=${dato}`);
  }

  condpto(){
    return this.http.get(`${this.url}?control=dpt`);
  }

  conciudad(iddpto:any){
    return this.http.get(`${this.url}?control=ciu&idpto=${iddpto}`);
  }
}
