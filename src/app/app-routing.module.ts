import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {ProveedorComponent} from './proveedor/proveedor.component'
import {AppComponent} from './app.component'



const routes: Routes = [
  {path: 'productos', component: DashboardComponent },
  {path: 'proveedores', component: ProveedorComponent },
  {path: 'inicio', component: AppComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
