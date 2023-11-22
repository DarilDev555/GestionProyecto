import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { Proveedor } from '../modelos/proveedor';



export interface PeriodicElement {
  name: string;
  id: number;
  telefono: number;
  correo: String;
  direccion: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: 'Proveedor 1',
    telefono: 1234567890,
    correo: 'proveedor1@example.com',
    direccion: 'Calle 1, Ciudad 1',
  },
  {
    id: 2,
    name: 'Proveedor 2',
    telefono: 9876543210,
    correo: 'proveedor2@example.com',
    direccion: 'Calle 2, Ciudad 2',
  },
  {
    id: 3,
    name: 'Proveedor 3',
    telefono: 5555555555,
    correo: 'proveedor3@example.com',
    direccion: 'Calle 3, Ciudad 3',
  },
  {
    id: 4,
    name: 'Proveedor 4',
    telefono: 9999999999,
    correo: 'proveedor4@example.com',
    direccion: 'Calle 4, Ciudad 4',
  },
  {
    id: 5,
    name: 'Proveedor 5',
    telefono: 77777777,
    correo: 'proveedor5@example.com',
    direccion: 'Calle 5, Ciudad 5',
  },
];

@Component({
  selector: 'proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'telefono',
    'correo',
    'direccion',
    'accion',
  ];
  dataSource = ELEMENT_DATA;
  isDrawerOpened = false;
  name = '';
  userName = '';
  imag = '';
  buscarTexto: string = '';
  proveedoresTotales: Proveedor[] = [];
  proveedorSelect: Proveedor[] = [];
  constructor(private router: Router, public dialog: MatDialog) {

    this.proveedoresTotales = ELEMENT_DATA.map((element) => {
      return {
        id: element.id,
        name: element.name,
        telefono: element.telefono,
        correo: element.correo,
        direccion: element.direccion,
      };
    });

  }
  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }
  clearUserData() {
    this.userName = '';
    this.imag = '';
    this.isDrawerOpened = !this.isDrawerOpened;
  }
  toLogin() {
    this.router.navigate(['']);
  }

  resetCantidadInput() {
  }

  proveedorDelete(element: any) {
    const index = this.proveedoresTotales.findIndex(
      (proveedor: Proveedor) => proveedor.id ===element.id
    );

      this.proveedoresTotales.splice(index, 1);


    this.dataSource = this.proveedoresTotales.map((proveedor: Proveedor) => {
      return {
        id: proveedor.id,
        name: proveedor.name,
        telefono: proveedor.telefono,
        correo: proveedor.correo,
        direccion: proveedor.direccion,
      };
    });
  }

  proveedorAdd() {
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


}