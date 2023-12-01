import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Producto } from '../../modelos/producto';
import { ConfirmacionVDialogComponent } from '../confirmacion-v-dialog/confirmacion-v-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoAC } from 'src/app/modelos/productoAc';
import { HttpClient } from '@angular/common/http';

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
  productosTotales!: ProductoAC[];
  productoEnCarrito!: Producto[];

  total: number = 0;

  cambio = this.total;

  constructor(
    private http: HttpClient,
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
    this.productos.forEach((producto) => {
      this.total = this.total + producto.total;
    });

  }

  generarTicket() {
    console.log('ticket:', this.productos);
    console.log('Total:', this.total);
  }

  calcularCambio(event: any) {
    const cantidad = event?.target?.value;
    if (!isNaN(cantidad)) {
      this.cambio = cantidad - this.total;
    } else {
      this.cambio = this.total;
    }
  }
  cancelarCompra() {
    // Cierra el diálogo con la lista de productos
    this.dialogRef.close(this.productos);
  }

  comprar() {
    this.generarTicket();


    this.obtenerProductosPorId(); 
    //console.log('productos en carrito a modificar el stock',this.productosTotales)
    console.log('ggg',this.productosTotales)

    // Vaciar la lista del carrito
    //this.productos = [];
    this.actualizarDataSource();

    // También puedes eliminar la variable del carrito del almacenamiento local
    localStorage.removeItem('carrito');
}


  obtenerProductosPorId() {
    this.productosTotales = [];

    this.productos.forEach((producto) => {
      this.http
      .get<any>(`http://127.0.0.1:8000/api/ProductosComplete/${producto.id}`)
      .subscribe(
        (data) => {
          
   
    

            // Encuentra el producto correspondiente en dataSource
            const productoEnDataSource = this.productos.find(
              (prod: any) => prod.id === producto.id
            );
            if(!productoEnDataSource){
              return
            }
  
            // Si se encuentra el producto en dataSource, obtén su cantidad
            const cantidadEnDataSource = productoEnDataSource ? productoEnDataSource.cantidad : 0;
  
            const product: ProductoAC = {
              ProductoID: data.ProductoID,
              Nombre: data.Nombre,
              Descripcion: data.Descripcion,
              Precio: data.Precio,
              Stock: data.Stock - productoEnDataSource.cantidad ,
              FechaCaducidad: new Date(data.FechaCaducidad),
            };
            this.productosTotales.push(product);
            this.reducirStock(product.ProductoID,product.Stock)
           
            

        },
        (error) => {
          console.error('Error fetching data from the API:', error);
        }
      );
    });

   
  }

  reducirStock(productoId: number, cantidadAgregada: number){


 
    const producto = this.productosTotales.find((p) => p.ProductoID === productoId);

    if (!producto) {
      console.error(`No se encontró un producto con ID ${productoId}`);
      return;
    }
    const pro: ProductoAC = {
      ProductoID: producto.ProductoID,
      Nombre: producto.Nombre,
      Descripcion: producto.Descripcion,
      Precio: producto.Precio,
      Stock: cantidadAgregada ,
      FechaCaducidad: producto.FechaCaducidad,
    };
    const apiUrl = `http://127.0.0.1:8000/api/ProductosComplete/${producto.ProductoID}/`;

    if (producto) {
      // Modificar el stock
      producto.Stock += cantidadAgregada;
    
      console.log(apiUrl,pro)
      // Actualizar la información en la API
      this.http.put(apiUrl, pro).subscribe(() => {
            console.log('Stock modificado exitosamente:');
          },
          (error) => {
            console.error('Error al modificar el stock en la API:', error);
            // Si hay un error al actualizar en la API, revertir los cambios locales
            producto.Stock -= cantidadAgregada;
          }
        );
    } else {
      console.error('Producto no encontrado');
    }

  }
}
