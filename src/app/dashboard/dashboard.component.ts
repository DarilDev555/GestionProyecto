import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../modelos/producto';

export interface PeriodicElement {
  nombre: string;
  id: number;
  precio: number;
  stock: number;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    nombre: 'Tomate',
    precio: 10,
    stock: 5,
    descripcion: 'Tomate rojo 10 pesos el kilo ',
  },
  {
    id: 2,
    nombre: 'Cebolla',
    precio: 4,
    stock: 10,
    descripcion: 'Cebolla morada 4 pesos el kilo ',
  },
  {
    id: 3,
    nombre: 'Cilantro',
    precio: 6,
    stock: 3,
    descripcion: '6 pesos el manojo fresco',
  },
  {
    id: 4,
    nombre: 'Peregil',
    precio: 9,
    stock: 20,
    descripcion: '9 pesos el manojo fresco',
  },
  {
    id: 5,
    nombre: 'Sandia',
    precio: 10,
    stock: 15,
    descripcion: 'Por kilo ',
  },
];

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
  productosTotales: Producto[] = [];
  productosFiltrados: Producto[] = [];
  originalData: PeriodicElement[] = ELEMENT_DATA;
  cantidadInputs: number[] = new Array(ELEMENT_DATA.length).fill(0); // Initialize an array with default quantity values (1 for each row)
  buscarTexto: string = '';
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, public dialog: MatDialog) {
    const carritoDataString = localStorage.getItem('carrito');

    if (carritoDataString !== null) {
      const carritoData = JSON.parse(carritoDataString);
      this.productos = carritoData;
    }
    this.productosTotales = ELEMENT_DATA.map((element) => {
      return {
        id: element.id,
        nombre: element.nombre,
        precio: element.precio,
        stock: element.stock,
        descripcion: element.descripcion,
        cantidad: 0, // Puedes establecer la cantidad inicial en 0
        total: 0, // Puedes establecer el total inicial en 0
      };
    });
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
      console.log('la cantidad es:');
      const productoExistente = this.productos.find(
        (producto) => producto.id === id
      );
      if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad y actualizar el total
        productoExistente.cantidad += cantidad; // Asegurando que cantidad sea un número
        productoExistente.total =
          productoExistente.cantidad * productoExistente.precio;
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
      window.alert('No has ingresado la cantidad de productos.');
    }
  }
  openDialogCarritoCompras() {
    console.log('Opening dialog...');
    console.log(this.productos);
    const dialogRef = this.dialog.open(CarritoComprasComponent, {
      data: { productos: this.productos },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      // Actualiza la lista de productos en DashboardComponent
      if (result) {
        this.productos = [];
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
    console.log('elementdata:', ELEMENT_DATA);
    console.log('datasource:', this.dataSource);
  }

  actualizarTabla(){
    this.dataSource = ELEMENT_DATA;
  }

  limpiarInput() {
    this.buscarTexto = '';
  }
  
}
