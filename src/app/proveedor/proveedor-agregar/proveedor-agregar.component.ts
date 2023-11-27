
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorBD } from 'src/app/modelos/proveedorBD';


@Component({
  selector: 'app-proveedor-agregar',
  templateUrl: './proveedor-agregar.component.html',
  styleUrls: ['./proveedor-agregar.component.css']
})



export class ProveedorAgregarComponent {
  

  constructor(
    public dialogRef: MatDialogRef<ProveedorAgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProveedorBD
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


