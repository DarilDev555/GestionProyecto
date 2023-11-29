import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Productos } from 'src/app/modelos/productos';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Productos       
  ){}
onNoClick (): void {
  this.dialogRef.close();
}
}
