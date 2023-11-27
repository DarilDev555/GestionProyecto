import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorBD } from 'src/app/modelos/proveedorBD';



@Component({
  selector: 'app-proveedor-editar',
  templateUrl: './proveedor-editar.component.html',
  styleUrls: ['./proveedor-editar.component.css']
})
export class ProveedorEditarComponent {
  constructor(
    public dialogRef: MatDialogRef<ProveedorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProveedorBD
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

