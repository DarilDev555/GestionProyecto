import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 



export interface PeriodicElement {
  name: string;
  id: number;
  precio: number;
  stock: number;
  descripcion: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Angel Escobar', precio: 10, stock: 5, descripcion: 'Tomate rojo ' },
  {
    id: 2,
    name: 'Cebolla',
    precio: 4.0026,
    stock: 10,
    descripcion: 'Cebolla morada ',
  },
  {
    id: 3,
    name: 'Cilantro',
    precio: 6.941,
    stock: 3,
    descripcion: 'Fresco 10 el manojo',
  },
  {
    id: 4,
    name: 'Peregil',
    precio: 9.0122,
    stock: 20,
    descripcion: 'Fresco 5 el manojo ',
  },
  {
    id: 5,
    name: 'Sandia',
    precio: 10.811,
    stock: 15,
    descripcion: 'Por kilo ',
  },
  {
    id: 6,
    name: 'Naranja',
    precio: 12.0107,
    stock: 25,
    descripcion: 'por kilo y por bolsa',
  },
  { id: 7, name: 'Mango', precio: 14.0067, stock: 20, descripcion: 'manila' },
  {
    id: 8,
    name: 'Coliflor',
    precio: 15.9994,
    stock: 20,
    descripcion: 'chica ',
  },
  { id: 9, name: 'Uva', precio: 18.9984, stock: 35, descripcion: 'Morada' },
  { id: 10, name: 'Fresa', precio: 20.1797, stock: 50, descripcion: 'Fresca' },
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
    'precio',
    'stock',
    'descripcion',
    'accion',
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
