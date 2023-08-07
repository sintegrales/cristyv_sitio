import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  promociones: any;
  promoprod2: any;

  constructor(private sproducto: ProductoService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.sproducto.promo().subscribe((result:any) => {
      this.promociones = result;
      //this.promoprod.push()
      let largo = this.promociones.length;
      let promoprod=[];
      for(let i=0; i<largo; i++){
        let img = this.promociones[i].imagenes.split(',');
        let obj = {
          codigo: this.promociones[i].codigo,
          nombre: this.promociones[i].nombre,
          cate: this.promociones[i].categoria,
          marca: this.promociones[i].marca,
          precio: this.promociones[i].precio,
          img: img[0]
        }
        promoprod.push(obj);
      }
      this.promoprod2 = promoprod;
      //console.log(this.promociones);
      //console.log(this.promociones[0].codigo);
      console.log(this.promoprod2);
      
    })
    
  }

}
