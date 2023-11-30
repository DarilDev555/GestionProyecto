import { Component,Inject } from '@angular/core';
import {User} from '../../modelos/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-creat-user-dialog',
  templateUrl: './creat-user-dialog.component.html',
  styleUrls: ['./creat-user-dialog.component.css']
})
export class CreatUserDialogComponent {

  user!: User;
  loginForm!: FormGroup;
  dataSource!: MatTableDataSource<User>;
  correoElectronico!: any;

  constructor(
    public dialogRef: MatDialogRef<CreatUserDialogComponent>, 
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {

    this.user = { ...data };
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],      
      nombreUsuario: ['', Validators.required],
      cargo: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      rolID: ['', Validators.required],
    });
    this.loginForm.get('correoElectronico')?.setValidators([Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]);
    this.loginForm.get('correoElectronico')?.updateValueAndValidity();
  }

  onCancel(){
    
    this.dialogRef.close();
  }
  oncreate(){
    console.log(this.user);
    this.dialogRef.close(this.user);
  }


}
