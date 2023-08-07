import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './modulos/principal.component';
import { HeaderComponent } from './estructura/header/header.component';
import { NavComponent } from './estructura/nav/nav.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { LoginComponent } from './modulos/login/login.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CajaComponent } from './modulos/caja/caja.component';
import { CateComponent } from './modulos/cate/cate.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CompraComponent } from './modulos/compra/compra.component';
import { ProductoComponent } from './modulos/producto/producto.component';
import { ProvComponent } from './modulos/prov/prov.component';
import { VentaComponent } from './modulos/venta/venta.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { ReporteComponent } from './modulos/reporte/reporte.component';
import { NoencontroComponent } from './estructura/noencontro/noencontro.component';
import { VentainsComponent } from './modulos/venta/ventains.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    CajaComponent,
    CateComponent,
    ClienteComponent,
    CompraComponent,
    ProductoComponent,
    ProvComponent,
    VentaComponent,
    UsuarioComponent,
    ReporteComponent,
    NoencontroComponent,
    VentainsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
