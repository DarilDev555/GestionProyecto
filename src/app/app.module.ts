import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CarritoComprasComponent } from './dashboard/carrito-compras/carrito-compras.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ConfirmacionVDialogComponent } from './dashboard/confirmacion-v-dialog/confirmacion-v-dialog.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ProveedorAgregarComponent } from './proveedor/proveedor-agregar/proveedor-agregar.component';
import { ProveedorEditarComponent } from './proveedor/proveedor-editar/proveedor-editar.component';



@NgModule({
  declarations: [
    AppComponent,  
    DashboardComponent, CarritoComprasComponent, ProveedorComponent, LoginPageComponent, ConfirmacionVDialogComponent, ProveedorAgregarComponent, ProveedorEditarComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    FormsModule,  
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
