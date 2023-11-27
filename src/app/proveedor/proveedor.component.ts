import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { ProveedorBD } from '../modelos/proveedorBD';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorAgregarComponent } from './proveedor-agregar/proveedor-agregar.component';
import { ProveedorEditarComponent } from './proveedor-editar/proveedor-editar.component';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private apiUrl = 'http://127.0.0.1:8000/api/Proveedores/';

  constructor(private http: HttpClient) {}

  obtenerProveedores(): Observable<ProveedorBD[]> {
    return this.http.get<ProveedorBD[]>(this.apiUrl);
  }

  agregarProveedor(proveedorBD: ProveedorBD): Observable<ProveedorBD> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': 'tu-token-csrf-aqui',  // Reemplaza con tu token CSRF real
    });

    return this.http.post<ProveedorBD>(this.apiUrl, proveedorBD, { headers });
}

obtenerProveedorPorId(id: number): Observable<ProveedorBD> {
  const url = `${this.apiUrl}${id}/`;
  return this.http.get<ProveedorBD>(url);
}

editarProveedor(id: number, proveedorBD: ProveedorBD): Observable<ProveedorBD> {
  const url = `${this.apiUrl}${id}/`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': 'tu-token-csrf-aqui',  // Reemplaza con tu token CSRF real
  });

  return this.http.put<ProveedorBD>(url, proveedorBD, { headers });
}

eliminarProveedor(id: number): Observable<any> {
  const url = `${this.apiUrl}${id}/`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': 'tu-token-csrf-aqui',  // Reemplaza con tu token CSRF real
  });

  return this.http.delete(url, { headers });
}

 
}



export interface PeriodicElement {
  ProveedorID: number;
  Nombre: string;
  Direccion: string;
  Telefono: string; 
  CorreoElectronico: string;
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

  
  proveedoresTotales: ProveedorBD[] = [];
  proveedorSelect: ProveedorBD[] = [];
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

  proveedorBuscar() {    
    const buscarTexto = this.buscarTexto.trim(); // Elimina espacios en blanco alrededor
    const id = parseInt(buscarTexto);
  
    console.log('texto:', buscarTexto);
    console.log('totales:', this.proveedoresTotales);
  
    if (!isNaN(id)) {
      // Si la conversión a número es exitosa, busca por ID
      this.proveedorService.obtenerProveedorPorId(id).subscribe(
        (proveedorEncontrado) => {
          if (proveedorEncontrado) {
            this.elementDataToProveedor(proveedorEncontrado);
            console.log('Encontrado (por ID):', proveedorEncontrado);
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
  

  elementDataToProveedor(proveedor: ProveedorBD) {
    // Crea una nueva matriz de un solo elemento con el producto
    const newElementData: PeriodicElement[] = [
      {
        ProveedorID: proveedor.ProveedorID,
        Nombre: proveedor.Nombre,
        Direccion: proveedor.Direccion,
        Telefono: proveedor.Telefono,
        CorreoElectronico: proveedor.CorreoElectronico,
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
    const dialogRef = this.dialog.open(ProveedorAgregarComponent, {
      width: '70vh',
      height: '50vh',
      data: {
        ProveedorID: 0,
        Nombre: '',
        Direccion: '',
        Telefono: '',
        CorreoElectronico: ''
      } as ProveedorBD
    });

    

    dialogRef.afterClosed().subscribe(result => {
      this.proveedorService.agregarProveedor(result).subscribe(
        (proveedorAgregado) => {
            
            console.log('Solicitud a enviar:', JSON.stringify(result));
            // Resto del código
        },
        (error) => {
          console.log('Proveedor a agregar:', result);
        }
    );
    });
  }

  proveedorEdit(id: number): void {
    // Obtener la información del proveedor por su ID
    this.proveedorService.obtenerProveedorPorId(id).subscribe(
      (proveedor: ProveedorBD) => {
        // Abrir el diálogo con la información del proveedor
        const dialogRef = this.dialog.open(ProveedorEditarComponent, {
          width: '70vh',
          height: '50vh',
          data: {
            Nombre: proveedor.Nombre,
            Direccion: proveedor.Direccion,
            Telefono: proveedor.Telefono,
            CorreoElectronico: proveedor.CorreoElectronico
          } as ProveedorBD
        });
  
        dialogRef.afterClosed().subscribe(result => {
            
          this.proveedorService.editarProveedor(id,result).subscribe(
            (proveedorEditado) => {
                
                console.log('Solicitud a enviar:', JSON.stringify(result));
                // Resto del código
            },
            (error) => {
              console.log('Proveedor a agregar:', result);
            }
        );
        });
      });
  }

  
  proveedorDelete(id: number) {
    
    this.proveedorService.eliminarProveedor(id).subscribe(
      (proveedorEditado) => {
          
          console.log('Solicitud a enviar:', JSON.stringify(id));
          // Resto del código
      },
      (error) => {
        console.log('Proveedor a agregar:', id);
      }
  );
  
}


  


}