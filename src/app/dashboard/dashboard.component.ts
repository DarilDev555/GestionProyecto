import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';
import { Produc } from '../modelos/produc';

export interface PeriodicElement {
  nombre: string;
  id: number;
  precio: number;
  stock: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'precio',
    'stock',
    'descripcion',
    'cantidad',
    'accion',
  ];

  productos: Producto[] = [];
  producs: Produc[] = [];
  productosTotales: Producto[] = [];
  productosFiltrados: Producto[] = [];
  originalData: PeriodicElement[] = ELEMENT_DATA;
  cantidadInputs: number[] = new Array(ELEMENT_DATA.length).fill(0); // Initialize an array with default quantity values (1 for each row)
  buscarTexto: string = '';

  dataSource = ELEMENT_DATA;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
    i: number = 1;
    totalPages: number = 0;
    selectedPage: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {
    const carritoDataString = localStorage.getItem('carrito');

    if (carritoDataString !== null) {
      const carritoData = JSON.parse(carritoDataString);
      this.productos = carritoData;
    }

    this.productosTotales = ELEMENT_DATA.map((Produc) => {
      return {
        id: Produc.id,
        nombre: Produc.nombre,
        precio: Produc.precio,
        stock: Produc.stock,
        descripcion: Produc.descripcion,
        cantidad: 0, // Puedes establecer la cantidad inicial en 0
        total: 0, // Puedes establecer el total inicial en 0
      };
    });
    this.obtenerProductos();
  }

  listaCarrito(
    id: number,
    nombre: string,
    precio: number,
    stock: number,
    descripcion: string,
    cantidad: number
  ) {
    if (cantidad > 0) {
      if (cantidad <= stock) {
        const productoExistente = this.productos.find(
          (producto) => producto.id === id
        );
        if (productoExistente) {
          // Si el producto ya existe, aumentar la cantidad y actualizar el total
          productoExistente.cantidad += cantidad; // Asegurando que cantidad sea un número
          productoExistente.total = productoExistente.cantidad * productoExistente.precio;
          
          //descontar stock 
          const index = this.productosTotales.findIndex(
            (producto) => producto.id === id
          );
          if (index !== -1) {
            this.productosTotales[index].stock -= cantidad;
            console.log('producto:', this.productosTotales[index])
            this.modificarProducto(id, this.productosTotales[index].stock);

          }

        } else {
          // Si el producto no existe en el carrito, agrégalo a la lista
          const producto: Producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            stock: stock,
            descripcion: descripcion,
            cantidad: cantidad, // Asegurando que cantidad sea un número
            total: precio * cantidad,
          };
          this.productos.push(producto);
          // Guarda los productos en el almacenamiento local para persistencia
          localStorage.setItem('carrito', JSON.stringify(this.productos));
        }
        window.alert(`Producto agregado: ${nombre}`);
      } else {
        window.alert(
          `La cantidad deseada (${cantidad}) es mayor que el stock disponible (${stock}).`
        );
      }
    } else {
      window.alert('No has ingresado una cantidad válida de productos.');
    }
  }
  openDialogCarritoCompras() {
    console.log('Opening dialog...');
    console.log(this.productos);
    const dialogRef = this.dialog.open(CarritoComprasComponent, {
      data: { productos: this.productos },
    });

    dialogRef.afterClosed().subscribe((result: Producto[] | undefined) => {
      if (result) {
        console.log('Lista de productos después de cancelar:', result);
      } else {
        console.log('Compra cancelada');
      }
    });
  }
  resetCantidadInput(i: number) {
    this.cantidadInputs[i] = 0; // Reset the input value for the row at index 'i'
  }

  buscarProducto() {
    const buscarTexto = this.buscarTexto.trim(); // Elimina espacios en blanco alrededor
    const id = parseInt(buscarTexto);

    console.log('texto:', buscarTexto);
    console.log('totales:', this.productosTotales);

    if (!isNaN(id)) {
      // Si la conversión a número es exitosa, busca por ID
      const productoExistente = this.productosTotales.find(
        (producto) => producto.id === id
      );

      if (productoExistente) {
        this.elementDataToProducto(productoExistente);
        console.log('Encontrado (por ID):', productoExistente);
      } else {
        console.log('Producto no encontrado (por ID)', productoExistente);
      }
    } else {
      // Si no es un número, busca por nombre
      const nombre = buscarTexto.toLowerCase(); // Convierte el texto de búsqueda a minúsculas

      const productoExistente = this.productosTotales.find(
        (producto) => producto.nombre.toLowerCase() === nombre
      );

      if (productoExistente) {
        console.log('Encontrado (por nombre):', productoExistente);
        this.elementDataToProducto(productoExistente);
      } else {
        console.log('Producto no encontrado (por nombre)');
      }
    }
  }

  elementDataToProducto(producto: Producto) {
    // Crea una nueva matriz de un solo elemento con el producto
    const newElementData: PeriodicElement[] = [
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        descripcion: producto.descripcion,
      },
    ];

    // Actualiza dataSource para reflejar los cambios
    this.dataSource = newElementData;
  }

  actualizarTabla() {

    this.dataSource = this.productosTotales;
  }

  limpiarInput() {
    this.buscarTexto = '';
  }

  obtenerProductos() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/ProductosComplete/')
      .subscribe(
        (data) => {
          this.productosTotales = [];

          for (const productDataFull of data) {
            const product: Produc = {
              id: productDataFull.ProductoID,
              nombre: productDataFull.Nombre,
              descripcion: productDataFull.Descripcion,
              precio: productDataFull.Precio,
              stock: productDataFull.Stock,
             
            };
            this.producs.push(product);
            this.productosTotales.push({
              id: product.id,
              nombre: product.nombre,
              precio: product.precio,
              stock: product.stock,
              descripcion: product.descripcion,
              cantidad: 0,
              total: 0,
            });

            this.dataSource = this.productosTotales.slice(0, this.itemsPerPage);
          }
          this.totalItems = this.productosTotales.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

          this.onPageChange({ pageIndex: this.currentPage - 1 });
        },
        (error) => {
          console.error('Error fetching data from the API:', error);
        }
      );
    console.log('Lista de productos de la api', this.producs);
  }

  onPageChange(event: any) {
    if (event.pageSize == undefined) {
      this.itemsPerPage = 5;
    } else {
      this.itemsPerPage = event.pageSize;
    }

    this.currentPage = event.pageIndex + 1;

    // Obtener los productos de la página actual directamente desde this.productosTotales
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.productosTotales.slice(startIndex, endIndex);
  }

  getCurrentPageProductos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productosTotales.slice(startIndex, endIndex);
  }

  modificarProducto(id: number, nuevoStock: number): void {
    const index = ELEMENT_DATA.findIndex((producto) => producto.id === id);
  
    if (index !== -1) {
      // Modificar el atributo específico (en este caso, el stock)
      ELEMENT_DATA[index].stock = nuevoStock;
      console.log(`Producto con ID ${id} modificado. Nuevo stock: ${nuevoStock}`);
    } else {
      console.log(`Producto con ID ${id} no encontrado.`);
    }
  }
}
