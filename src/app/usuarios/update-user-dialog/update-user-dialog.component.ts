import { Component, Inject } from '@angular/core';
import { User } from '../../modelos/user';
import { UsuarioM} from '../../modelos/usuario'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css'],
})
export class UpdateUserDialogComponent {
  user!: UsuarioM;
  usuario!: User;
  loginForm!: FormGroup;
  dataSource!: MatTableDataSource<User>;

  nombre!: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioM
  ) {  }

  ngOnInit(): void {

    
    // Clone the original user data to avoid modifying the original user object directly
    this.user = { ...this.data };
    
    console.log('el usuario del dialogo', this.user.id);
    this.buscarUser(this.data.id);
    console.log('el usuario del de la base', this.usuario);
    


  }
  onCancel() {
    this.dialogRef.close();
  }
  onUpdate(): void {
    // Update the user object with the form values

    this.usuario = {
      ...this.usuario,
      Nombre: this.loginForm.value.nombre,
      Password: this.loginForm.value.password,
      Usuario: this.loginForm.value.nombreUsuario,
      Cargo: this.loginForm.value.cargo,
      Telefono: this.loginForm.value.telefono,
      CorreoElectronico: this.loginForm.value.correoElectronico,
      RolID: this.loginForm.value.rolID,
    };
    // Close the dialog and pass the updated user data back to the UsersComponent
    this.dialogRef.close(this.usuario);
  }



  buscarUser(EmpleadoID: number) {
    if (!EmpleadoID) {
      console.error('User ID is missing.');
      return;
    }

    const apiUrl = `http://127.0.0.1:8000/api/Empleados/${EmpleadoID}`;

    this.http.get<User>(apiUrl).subscribe(
      (usuarioEncontrado) => {
        if (usuarioEncontrado) {
          console.log('Usuario encontrado:', usuarioEncontrado);
          this.usuario = usuarioEncontrado;

          this.loginForm = this.fb.group({
            nombre: [this.usuario.Nombre, Validators.required],
            password: [this.usuario.Password, Validators.required],
            nombreUsuario: [this.usuario.Usuario, Validators.required],
            cargo: [this.usuario.Cargo, Validators.required],
            telefono: [this.usuario.Telefono, Validators.required],
            correoElectronico: [this.usuario.CorreoElectronico, Validators.required],
            rolID: [this.usuario.RolID, Validators.required],
          });
          // Aquí puedes hacer lo que necesites con el usuario encontrado
        } else {
          console.log('Usuario no encontrado');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }


}
