import { Component,Inject } from '@angular/core';
import { Productos } from 'src/app/modelos/productos';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  // Propiedades para almacenar los datos del nuevo producto
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  fechaCaducidad: Date | null = null;

  constructor(
    public dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Productos
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  

  
  }
}