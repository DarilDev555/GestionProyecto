import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {ProveedorComponent} from './proveedor/proveedor.component'
import {AppComponent} from './app.component'
import {LoginPageComponent} from './login-page/login-page.component'
import {UsuariosComponent} from './usuarios/usuarios.component'



const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'proveedores', component: ProveedorComponent },
  {path: 'login', component: LoginPageComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'usuarios', component: UsuariosComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
