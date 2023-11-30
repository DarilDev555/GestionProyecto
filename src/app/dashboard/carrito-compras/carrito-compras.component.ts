import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Producto } from '../../modelos/producto';
import { ConfirmacionVDialogComponent } from '../confirmacion-v-dialog/confirmacion-v-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

export interface PeriodicElement {
  nombre: string;
  id: number;
  precio: number;
}

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css'],
})
export class CarritoComprasComponent {
  productos: Producto[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'precio',
    'cantidad',
    'total',
    'accion',
  ]; // Define las columnas que mostrarás
  dataSource: any = [];
  dataSourceEmpty: any = [];

  total :number = 0;

  cambio = this.total;


  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CarritoComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productos: Producto[] }
  ) {
    this.dataSourceEmpty = [...this.dataSource];

    // Si se proporcionan datos al abrir el diálogo, cárgalos
    if (data && data.productos) {
      this.productos = data.productos;
      this.actualizarDataSource();
    }
    console.log('lista de productos:', data.productos);
    this.totalCostoProductos();
    
  }
  eliminarFila(element: any) {
    console.log('Eliminando fila:', element);

    const index = this.productos.findIndex(
      (producto: Producto) => producto.id === element.id
    );
    if (index !== -1) {
      this.productos.splice(index, 1);
    }

    // Luego, actualiza la fuente de datos de la tabla.
    this.actualizarDataSource();
    this.total = 0;
    this.totalCostoProductos();
  }

  openDialogConfirmacion(element: any): void {
    const dialogRef = this.dialog.open(ConfirmacionVDialogComponent, {
      data: { codigo: '' }, // Puedes pasar cualquier dato necesario aquí
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed:', result);
      if (result) {
        this.eliminarFila(element);
      }
    });
  }

  comprar() {
    this.generarTicket();
    // Vaciar la lista del carrito
    this.productos = [];
    this.actualizarDataSource();

    // También puedes eliminar la variable del carrito del almacenamiento local
    localStorage.removeItem('carrito');
    
  }

  actualizarDataSource() {
    this.dataSource = this.productos.map((producto: Producto) => {
      return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        total: producto.total,
      };
    });
  }

  totalCostoProductos(): void {
    this.productos.forEach(producto => {
        this.total = this.total + producto.total;
    }); 
    console.log('el total es:', this.total);

  }

  generarTicket(){
    console.log('ticket:',this.productos);
    console.log('Total:',this.total);
  }

  calcularCambio(event: any) {
    const cantidad = event?.target?.value;
    if (!isNaN(cantidad)) {
      this.cambio = cantidad - this.total ;
    } else {
      this.cambio = this.total;
    }
  }
  cancelarCompra() {
    // Cierra el diálogo con la lista de productos
    this.dialogRef.close(this.productos);
  }
  
 

}
