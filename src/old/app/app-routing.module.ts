import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoencontroComponent } from './estructura/noencontro/noencontro.component';
import { ValidaruserGuard } from './guards/validaruser.guard';
import { CajaComponent } from './modulos/caja/caja.component';
import { CateComponent } from './modulos/cate/cate.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CompraComponent } from './modulos/compra/compra.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { PrincipalComponent } from './modulos/principal.component';
import { ProductoComponent } from './modulos/producto/producto.component';
import { ProvComponent } from './modulos/prov/prov.component';
import { ReporteComponent } from './modulos/reporte/reporte.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { VentaComponent } from './modulos/venta/venta.component';
import { VentainsComponent } from './modulos/venta/ventains.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    canActivate: [ValidaruserGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'caja', component: CajaComponent },
        { path: 'cate', component: CateComponent },
        { path: 'cliente', component: ClienteComponent },
        { path: 'compra', component: CompraComponent },
        { path: 'producto', component: ProductoComponent },
        { path: 'prov', component: ProvComponent },
        { path: 'venta', component: VentaComponent },
        { path: 'ventains', component: VentainsComponent },
        { path: 'usuario', component: UsuarioComponent },
        { path: 'reporte', component: ReporteComponent },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoencontroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
