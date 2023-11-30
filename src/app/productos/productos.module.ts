import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponentComponent } from './productos-component/productos-component.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';  
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditProductosComponent } from './edit-productos/edit-productos.component';



@NgModule({
  declarations: [
    ProductosComponentComponent,
    AgregarProductoComponent,
    EditProductosComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule, 
    MatInputModule,
    MatTableModule

  ]
})
export class ProductosComponentModule {}

