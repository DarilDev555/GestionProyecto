import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



export interface PeriodicElement {
  name: string;
  id: number;
  precio: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Tomate', precio: 10,  },

  {
    id: 3,
    name: 'Cilantro',
    precio: 6.941,

  },

  {
    id: 5,
    name: 'Sandia',
    precio: 10.811,

  },
  { id: 9, name: 'Uva', precio: 18.9984 },

];

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent {
  constructor(public dialog: MatDialog) { }
  displayedColumns: string[] = ['id', 'name', 'precio', 'accion']; // Define las columnas que mostrarás
  dataSource = ELEMENT_DATA;


}
