import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url='https://cristyvariedades.com/php/login/';
  //url='https://itssoluciones.co/itspruebas/php/login/';

  constructor(private http:HttpClient) { }

  consultar(user: any, clave: any) {
    return this.http.get(`${this.url}login.php?user=${user}&clave=${clave}`);
  } 
}
