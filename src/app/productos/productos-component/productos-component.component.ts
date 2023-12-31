import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/modelos/productos';
import {ProductoAC} from '../../modelos/productoAc'
import { EditProductosComponent } from '../edit-productos/edit-productos.component';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Injectable({
  providedIn: 'root',
})
export class productosService {
  private apiUrl = 'http://127.0.0.1:8000/api/ProductosComplete/';
  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  agregarProductos(productos: Productos): Observable<Productos> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': 'tu-token-csrf-aqui',
    });
    return this.http.post<Productos>(this.apiUrl, productos, { headers });
  }
  obtenerProductoPorId(id: number): Observable<Productos> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Productos>(url);
  }

  editarProductos(id: number, productos: Productos): Observable<Productos> {
    const url = `${this.apiUrl}${id}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': 'tu-token-csrf-aqui',
    });
    return this.http.put<Productos>(url, productos, { headers });
  }

  eliminarProductos(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': 'tu-token-csrf-aqui', // Reemplaza con tu token CSRF real
    });

    return this.http.delete(url, { headers });
  }
}

export interface PeriodicElement {
  ProductoID: number;
  Nombre: string; // Cambiar 'String' a 'string'
  Descripcion: string;
  Stock: number;
  Precio: number;
  FechaCaducidad: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'productos',
  templateUrl: './productos-component.component.html',
  styleUrls: ['./productos-component.component.css'],
})
export class ProductosComponentComponent {
  displayedColumns: String[] = [
    'id',
    'nombre',
    'descripcion',
    'stock',
    'precio',
    'fechaCaducidad',
    'accion',
  ];

  productosTotales: Productos[] = [];
  productosCercaDeCaducar: Productos[] = [];
  productosParaComprar: Productos[] = [];
  productosSelect: Productos[] = [];
  dataSource = this.productosTotales;
  isDrawerOpened = false;
  name = '';
  userName = '';
  imag = '';
  buscarTexto: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  i: number = 1;
  totalPages: number = 0;
  selectedPage: number = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private productosService: productosService,
    private http: HttpClient
  ) {
    // Reemplaza la inicialización de this.proveedoresTotales con una llamada al servicio

    this.obtenerProductos();
  }

  oggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  resetCantidadInput() {}

  actualizar() {
    this.productosService.obtenerProductos().subscribe(
      (data) => {
        this.dataSource = data;
        this.totalItems = data.length;
        this.productosTotales = data;
        this.dataSource = this.productosTotales.slice(0, this.itemsPerPage);
        this.totalItems = this.productosTotales.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        this.onPageChange({ pageIndex: this.currentPage - 1 });
      },
      (error) => {
        console.error('Error al obtener proveedores desde la API:', error);
      }
    );
  }

  productoBuscar() {
    const buscarTexto = this.buscarTexto.trim(); // Elimina espacios en blanco alrededor
    const id = parseInt(buscarTexto);

    console.log('texto:', buscarTexto);
    console.log('totales:', this.productosTotales);

    if (!isNaN(id)) {
      // Si la conversión a número es exitosa, busca por ID
      this.productosService.obtenerProductoPorId(id).subscribe(
        (productosEncontrado) => {
          if (productosEncontrado) {
            this.elementDataToProductos(productosEncontrado);
            console.log('Encontrado (por ID):', productosEncontrado);
          } else {
            console.log('Proveedor no encontrado (por ID)');
            // Puedes manejar la lógica de qué hacer si el proveedor no se encuentra
          }
        },
        (error) => {
          console.error('Error al obtener proveedor por ID:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    } else {
      // Resto del código para la búsqueda por nombre, si es necesario
    }
  }

  elementDataToProductos(productos: Productos) {
    // Crea una nueva matriz de un solo elemento con el producto
    const newElementData: PeriodicElement[] = [
      {
        ProductoID: productos.ProductoID,
        Nombre: productos.Nombre,
        Descripcion: productos.Descripcion,
        Precio: productos.Precio,
        Stock: productos.Stock,
        FechaCaducidad: productos.FechaCaducidad,
      },
    ];
    // Actualiza dataSource para reflejar los cambios
    this.dataSource = newElementData;
    console.log('elementdata:', ELEMENT_DATA);
    console.log('datasource:', this.dataSource);
  }

  limpiarInput() {
    this.buscarTexto = '';
  }
  openModal(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '70vh',
      height: '50vh',
      data: {
        ProductoID: 0,
        Nombre: '',
        Descripcion: '',
        Stock: 0,
        Precio: 0,
        FechaCaducidad: new Date(),
      } as Productos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.productosService.agregarProductos(result).subscribe(
        (proveedorAgregado) => {
          console.log('Solicitud a enviar:', JSON.stringify(result));
          // Resto del código
        },
        (error) => {
          console.log('Pro a agregar:', result);
        }
      );
    });
  }

  productosEdit(id: number): void {
    // Obtener la información del proveedor por su ID
    this.productosService
      .obtenerProductoPorId(id)
      .subscribe((productos: Productos) => {
        // Abrir el diálogo con la información del proveedor
        const dialogRef = this.dialog.open(EditProductosComponent, {
          width: '70vh',
          height: '50vh',
          data: {
            ProductoID: productos.ProductoID,
            Nombre: productos.Nombre,
            Descripcion: productos.Descripcion,
            Precio: productos.Precio,
            Stock: productos.Stock,
            FechaCaducidad: productos.FechaCaducidad,
          } as Productos,
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.productosService.editarProductos(id, result).subscribe(
            (productoEditado) => {
              console.log('Solicitud a enviar:', JSON.stringify(result));
              // Resto del código
            },
            (error) => {
              console.log('Producto a agregar:', result);
            }
          );
        });
      });
  }

  productosDelete(id: number) {
    this.productosService.eliminarProductos(id).subscribe(
      (productoEditado) => {
        console.log('Solicitud a enviar:', JSON.stringify(id));
        // Resto del código
      },
      (error) => {
        console.log('Producto a agregar:', id);
      }
    );
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

  obtenerProductos() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/ProductosComplete/')
      .subscribe(
        (data) => {
          this.productosTotales = [];

          for (const productDataFull of data) {
            const product: Productos = {
              ProductoID: productDataFull.ProductoID,
              Nombre: productDataFull.Nombre,
              Descripcion: productDataFull.Descripcion,
              Precio: productDataFull.Precio,
              Stock: productDataFull.Stock,
              FechaCaducidad: productDataFull.FechaCaducidad,
            };

            this.productosTotales.push(product);

            this.dataSource = this.productosTotales.slice(0, this.itemsPerPage);
          }
          this.totalItems = this.productosTotales.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.onPageChange({ pageIndex: this.currentPage - 1 });
          this.verificarCaducidad();
          this.realizarCompraProductosEscasos();
        },
        (error) => {
          console.error('Error fetching data from the API:', error);
        }
      );
  }
  verificarCaducidad() {
    const fechaActual = new Date();

    let productosCercaDeCaducarNombres = []; 

    for (const producto of this.productosTotales) {
      const fechaCaducidad = new Date(producto.FechaCaducidad);

      const diferenciaMilisegundos = fechaCaducidad.getTime() - fechaActual.getTime();
      const diferenciaDias = 2 + Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));


      if (diferenciaDias > 0 && diferenciaDias <= 3) {
        productosCercaDeCaducarNombres.push(
          `El producto ${producto.Nombre} caduca en ${diferenciaDias} días.`);
      } else if (diferenciaDias === 0) {
        productosCercaDeCaducarNombres.push(`El producto ${producto.Nombre} caduca  hoy.`);
      } else if (diferenciaDias < 0) {
        productosCercaDeCaducarNombres.push(`El producto ${producto.Nombre} ha caducado.` );
      }

      if (diferenciaDias <= 3) {
        this.productosCercaDeCaducar.push(producto);
      }
    }

    // Mostrar alerta con los nombres de productos cercanos a caducar
    if (productosCercaDeCaducarNombres.length > 0) {
      const mensajeAlerta = 'Productos Cerca de caducar:\n' +   productosCercaDeCaducarNombres.join('\n');
      window.alert(mensajeAlerta);
    }
  }

  realizarCompraProductosEscasos(){
    let productosAReponer = []; 


    for (const producto of this.productosTotales) {
      if(producto.Stock<5){
        this.productosParaComprar.push(producto);
        productosAReponer.push(`El producto ${producto.Nombre} tiene ${producto.Stock} piezas en stock.` );
      }

    }

    if (productosAReponer.length > 0) {
      const mensajeAlerta = 'Productos Con stock bajo:\n' +   productosAReponer.join('\n') + '\nSe realizara la compra de producto automatico';
      window.alert(mensajeAlerta);
    }

    for (const producto of this.productosParaComprar) {

     this.realizarPedido(producto.ProductoID,15);

    }
  }

  realizarPedido(productoId: number, cantidadAgregada: number){


 
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
      Stock: producto.Stock + cantidadAgregada ,
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
