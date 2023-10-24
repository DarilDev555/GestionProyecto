import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 



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
  selector: 'app-dashboard',
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
  ];
  dataSource = ELEMENT_DATA;
  isDrawerOpened = false;
  name = '';
  userName = '';
  imag = '';
  constructor(private router: Router, public dialog: MatDialog) {}
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

}
