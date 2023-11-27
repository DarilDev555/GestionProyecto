import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { Proveedor } from '../modelos/proveedor';
import { ProveedorBD } from '../modelos/proveedorBD';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private apiUrl = 'http://127.0.0.1:8000/api/Proveedores/';

  constructor(private http: HttpClient) {}

  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  agregarProveedor(proveedorBD: ProveedorBD): Observable<ProveedorBD> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': 'tu-token-csrf-aqui',  // Reemplaza con tu token CSRF real
    });

    return this.http.post<ProveedorBD>(this.apiUrl, proveedorBD, { headers });
}
  // Agrega métodos para agregar, eliminar, editar proveedores si es necesario
}

export interface PeriodicElement {
  id: number;
  name: string;
  telefono: number;
  correo: String; 
  direccion: String;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent {
  displayedColumns: string[] = [
  'id',
  'nombre',
  'telefono',
  'correo',
  'direccion',
  'accion'];

  
  proveedoresTotales: Proveedor[] = [];
  proveedorSelect: Proveedor[] = [];
  dataSource = this.proveedoresTotales;
  isDrawerOpened = false;
  name = '';
  userName = '';
  imag = '';
  buscarTexto: string = '';


  
  constructor(private router: Router, public dialog: MatDialog, private proveedorService: ProveedorService) {
    // Reemplaza la inicialización de this.proveedoresTotales con una llamada al servicio
    this.proveedorService.obtenerProveedores().subscribe(
      (data) => {
        console.log('Datos de la API:', data);
        this.proveedoresTotales = data;
        this.dataSource = this.proveedoresTotales;
      },
      (error) => {
        console.error('Error al obtener proveedores desde la API:', error);
      }
    );
  }
  

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }
 
  toLogin() {
    this.router.navigate(['']);
  }

  resetCantidadInput() {
  }

  proveedorDelete(element: any) {
  }

  proveedorEdit() {
  }

  proveedorBuscar() {    
    const buscarTexto = this.buscarTexto.trim(); // Elimina espacios en blanco alrededor
    const id = parseInt(buscarTexto);

    console.log('texto:', buscarTexto);
    console.log('totales:', this.proveedoresTotales);

    if (!isNaN(id)) {
      // Si la conversión a número es exitosa, busca por ID
      const proveedorExixtente = this.proveedoresTotales.find(
        (proveedor) => proveedor.id === id
      );

      if (proveedorExixtente) {
        this.elementDataToProveedor(proveedorExixtente);
        console.log('Encontrado (por ID):', proveedorExixtente);
      } else {
        console.log('Producto no encontrado (por ID)', proveedorExixtente);
      }
    } else {
      // Si no es un número, busca por nombre
      const nombre = buscarTexto.toLowerCase(); // Convierte el texto de búsqueda a minúsculas

      const proveedorExixtente = this.proveedoresTotales.find(
        (proveedor) => this.proveedorAdd.name.toLowerCase() === nombre
      );

      if (proveedorExixtente) {
        console.log('Encontrado (por nombre):', proveedorExixtente);
        this.elementDataToProveedor(proveedorExixtente);
      } else {
        console.log('Producto no encontrado (por nombre)');
      }
    }
  }

  elementDataToProveedor(proveedor: Proveedor) {
    // Crea una nueva matriz de un solo elemento con el producto
    const newElementData: PeriodicElement[] = [
      {
        id: proveedor.id,
        name: proveedor.name,
        telefono: proveedor.telefono,
        correo: proveedor.correo,
        direccion: proveedor.direccion,
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


  proveedorAdd() {
    // Aquí podrías abrir un diálogo/modal para recopilar la información del nuevo proveedor
    // y luego llamar al servicio para agregarlo.

    const nuevoProveedor: ProveedorBD = {
      
      Nombre: 'Nombre',
      Direccion: 'Dirección',
      Telefono: "9512170127",
      CorreoElectronico: 'floria89@gmail.com',
      
    };

  this.proveedorService.agregarProveedor(nuevoProveedor).subscribe(
    (proveedorAgregado) => {
        
        console.log('Solicitud a enviar:', JSON.stringify(nuevoProveedor));
        // Resto del código
    },
    (error) => {
      console.log('Proveedor a agregar:', nuevoProveedor);
        console.error('Error al agregar proveedor:', error);
        console.log('Cuerpo de la respuesta completa:', error.error);
    }
);
  }


}