import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

export interface DialogData {
  codigo: string;
}

@Component({
  selector: 'app-confirmacion-v-dialog',
  templateUrl: './confirmacion-v-dialog.component.html',
  styleUrls: ['./confirmacion-v-dialog.component.css'],
})
export class ConfirmacionVDialogComponent {
  inputCode: string = '';
  mensajeVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionVDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  verificarCodigo() {
    const contraseñaDeseada = '123'; // Reemplaza con tu contraseña deseada

    if (this.inputCode === contraseñaDeseada) {
      console.log('true');
      this.dialogRef.close(true); // Contraseña correcta, devuelve true
    } else {
      console.log('false');
      this.mensajeVisible = true; // Contraseña incorrecta, devuelve false
    }
  }



}
