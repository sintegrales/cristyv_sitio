import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modulos/sitio/principal.component';
import { NoencontroComponent } from './modulos/sitio/noencontro/noencontro.component';
import { LoginComponent } from './modulos/admin/login/login.component';
import { InicioComponent } from './modulos/sitio/inicio/inicio.component';
import { DashboardComponent } from './modulos/admin/dashboard/dashboard.component';
import { UsuarioComponent } from './modulos/admin/usuario/usuario.component';
import { ValidaruserGuard } from './guars/validaruser.guard';
import { CateComponent } from './modulos/admin/cate/cate.component';
import { ProductoComponent } from './modulos/admin/producto/producto.component';
import { ClienteComponent } from './modulos/admin/cliente/cliente.component';
import { PedidoComponent } from './modulos/admin/pedido/pedido.component';
import { PedidoinsComponent } from './modulos/admin/pedidoins/pedidoins.component';
import { CatalogoComponent } from './modulos/sitio/catalogo/catalogo.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
      children: [
        { path: 'inicio', component: InicioComponent },
        { path: 'catalogo', component: CatalogoComponent },
        { path: '', redirectTo: '/catalogo', pathMatch: 'full' }
      ]
  },
     
  { path: 'dashboard', component: DashboardComponent, canActivate: [ValidaruserGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [ValidaruserGuard] },
  { path: 'cate', component: CateComponent, canActivate: [ValidaruserGuard] },
  { path: 'producto', component: ProductoComponent, canActivate: [ValidaruserGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [ValidaruserGuard] },
  { path: 'pedido', component: PedidoComponent, canActivate: [ValidaruserGuard] },
  { path: 'pedidoins', component: PedidoinsComponent, canActivate: [ValidaruserGuard] },

  { path: 'login', component: LoginComponent },
  { path: '**', component: NoencontroComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
