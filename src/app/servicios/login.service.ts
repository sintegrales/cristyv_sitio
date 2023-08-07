import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url='https://cristyvariedades.com/php/controlador/login.php';

  constructor(private http:HttpClient) { }

  consultar(user: any, clave: any) {
    return this.http.get(`${this.url}?user=${user}&clave=${clave}`);
  } 
}
