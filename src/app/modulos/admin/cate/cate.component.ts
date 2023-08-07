import { Component, OnInit } from '@angular/core';
import { CateService } from 'src/app/servicios/cate.service';
import { MarcaService } from 'src/app/servicios/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cate',
  templateUrl: './cate.component.html',
  styleUrls: ['./cate.component.scss']
})
export class CateComponent implements OnInit {

  //variables globales
  verfc = false;
  verfm = false;
  cate: any;
  marca: any;
  idc:any;
  idm:any
  cat = {
    nombre: ""
  };
  marc = {
    nombre: ""
  };
  limitec=0;
  limitem=0;
  //para validar
  validcnombre = true;
  validmnombre = true;
  
  bceditar = false;
  bmeditar = false;

  datofiltro:any;

  constructor(private scate: CateService, private smarca:MarcaService) { }

  ngOnInit(): void {
    this.consultac();
    this.limpiarc();
    this.consultam();
    this.limpiarm();
  }

  //////////////////////////////categorias
    //mostrar formulario
    mostrarc(dato:any) {
      switch(dato){
        case 0:
          this.verfc = false;
          this.bceditar = false;
          this.idc = "";
          this.limpiarc();
        break;
        case 1: 
          this.verfc = true;
        break;
      }  
    }
  
    //limpiar
    limpiarc(){
      this.cat.nombre = "";
    }
  
    //validar
    validarc(){
          
      if(this.cat.nombre == ""){
        this.validcnombre = false;
      }else{
        this.validcnombre = true;
      }
      console.log(this.validcnombre);
    }
  
    consultac() {
      this.scate.consultar().subscribe((result:any) => {
        this.cate = result;
        //console.log(this.usuario);
      })
      
    }
  
    ingresarc() {
      //console.log(this.cat);
      this.validarc();
      
      if(this.validcnombre==true){
        this.scate.insertar(this.cat).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //alert(datos['mensaje']);
            this.consultac();
          }
        });
        this.mostrarc(0);
        this.limpiarc();
      }
      
    }
  
    preguntac(id: any, nombre: any){
      console.log("entro con el id " + id);
      Swal.fire({
        title: '¿Esta seguro de eliminar la categoria '+ nombre +'?',
        text: "El proceso no podra ser revertido!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.borrarc(id);
          Swal.fire(
            'Eliminado',
            'Categoría ha sido eliminada.',
            'success'
          )
        }
      }) 
    }
  
  
    borrarc(id:any){
      this.scate.eliminar(id).subscribe((datos:any) => {
        if(datos['resultado']=='OK'){
          this.consultac();
        }
      });
    }
    
    cargardatosc(datos:any, id:number){
      console.log(id);
      this.cat.nombre = datos.nombre;
      this.idc = id;
      this.mostrarc(1);
      this.bceditar=true;
    }
  
    editarc(){
      //console.log(this.user);
      this.validarc();
      
      if(this.validcnombre==true){
        this.scate.edit(this.cat, this.idc).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //alert(datos['mensaje']);
            this.consultac();
          }
        });
        this.mostrarc(0);
      }
    }
  
    filtroc(){
      console.log(this.datofiltro);
      
      this.scate.filter(this.datofiltro).subscribe((result:any) => {
        this.cate = result;
        console.log(this.cate);
      })   
    } 

    ////////////////////////////marcas
   //mostrar formulario
  mostrarm(dato:any) {
    switch(dato){
      case 0:
        this.verfm = false;
        this.bmeditar = false;
        this.idm = "";
        this.limpiarm();
      break;
      case 1: 
        this.verfm = true;
      break;
    }  
  }

  //limpiar
  limpiarm(){
    this.marc.nombre = "";
  }

  //validar
  validarm(){
        
    if(this.marc.nombre == ""){
      this.validmnombre = false;
    }else{
      this.validmnombre = true;
    }
    console.log(this.validmnombre);
  }

  consultam() {
    this.smarca.consultar().subscribe((result:any) => {
      this.marca = result;
      //console.log(this.usuario);
    })
    
  }

  ingresarm() {
    //console.log(this.cat);
    this.validarm();
    
    if(this.validmnombre==true){
      this.smarca.insertar(this.marc).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consultam();
        }
      });
      this.mostrarm(0);
      this.limpiarm();
    }
    
  }

  preguntam(id: any, nombre: any){
    console.log("entro con el id " + id);
    Swal.fire({
      title: '¿Esta seguro de eliminar la marca '+ nombre +'?',
      text: "El proceso no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarm(id);
        Swal.fire(
          'Eliminado',
          'Marca ha sido eliminada.',
          'success'
        )
      }
    }) 
  }


  borrarm(id:any){
    this.smarca.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado']=='OK'){
        this.consultam();
      }
    });
  }
  
  cargardatosm(datos:any, id:number){
    console.log(id);
    this.marc.nombre = datos.nombre;
    this.idm = id;
    this.mostrarm(1);
    this.bmeditar=true;
  }

  editarm(){
    //console.log(this.user);
    this.validarm();
    
    if(this.validcnombre==true){
      this.smarca.edit(this.marc, this.idm).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          //alert(datos['mensaje']);
          this.consultam();
        }
      });
      this.mostrarm(0);
    }
  }

  filtro(){
    console.log(this.datofiltro);
    
    this.smarca.filter(this.datofiltro).subscribe((result:any) => {
      this.marc = result;
      console.log(this.marc);
    })   
  } 
}
