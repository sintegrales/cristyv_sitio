import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombre: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('nombre');
  }

  cerrar(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('perfil');
    this.router.navigate(['login']);
    
  }

}
