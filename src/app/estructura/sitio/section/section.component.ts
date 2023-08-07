import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  articulos: any;
  ultimos: any;

  constructor(private sproducto: ProductoService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.sproducto.ultimos().subscribe((result:any) => {
      this.articulos = result;
      //this.promoprod.push()
      let largo = this.articulos.length;
      let promoprod=[];
      for(let i=0; i<largo; i++){
        let img = this.articulos[i].imagenes.split(',');
        let obj = {
          codigo: this.articulos[i].codigo,
          nombre: this.articulos[i].nombre,
          cate: this.articulos[i].categoria,
          marca: this.articulos[i].marca,
          precio: this.articulos[i].precio,
          img: img[0]
        }
        promoprod.push(obj);
      }
      this.ultimos = promoprod;
      //console.log(this.promociones);
      //console.log(this.promociones[0].codigo);
      console.log(this.ultimos);
      
    })
    
  }

}
