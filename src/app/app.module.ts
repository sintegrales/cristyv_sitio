import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './modulos/sitio/principal.component';
import { LoginComponent } from './modulos/admin/login/login.component';
import { UsuarioComponent } from './modulos/admin/usuario/usuario.component';
import { NoencontroComponent } from './modulos/sitio/noencontro/noencontro.component';
import { InicioComponent } from './modulos/sitio/inicio/inicio.component';
import { DashboardComponent } from './modulos/admin/dashboard/dashboard.component';
import { NavComponent } from './estructura/admin/nav/nav.component';
import { SnavComponent } from './estructura/sitio/snav/snav.component';
import { CateComponent } from './modulos/admin/cate/cate.component';
import { ProductoComponent } from './modulos/admin/producto/producto.component';
import { ClienteComponent } from './modulos/admin/cliente/cliente.component';
import { PedidoComponent } from './modulos/admin/pedido/pedido.component';
import { PedidoinsComponent } from './modulos/admin/pedidoins/pedidoins.component';
import { HeaderComponent } from './estructura/sitio/header/header.component';
import { SectionComponent } from './estructura/sitio/section/section.component';
import { FooterComponent } from './estructura/sitio/footer/footer.component';
import { CatalogoComponent } from './modulos/sitio/catalogo/catalogo.component';
import { AdminComponent } from './modulos/sitio/admin/admin.component';




@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    UsuarioComponent,
    NoencontroComponent,
    InicioComponent,
    DashboardComponent,
    NavComponent,
    SnavComponent,
    CateComponent,
    ProductoComponent,
    ClienteComponent,
    PedidoComponent,
    PedidoinsComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    CatalogoComponent,
    AdminComponent
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
