import { Component } from '@angular/core';
import {UsuarioM} from '../modelos/usuario'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {User} from '../modelos/user'

export interface PeriodicElement {
  id: number;
  nombre: string;
  nombreUser: string;
  rol: string;
  telefono: number;
  correo: string;
}


const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'nombreUser', 'rol','telefono','correo', 'accion'];

  buscarTexto: string = '';

  dataSource = ELEMENT_DATA;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  i: number = 1;
  totalPages: number = 0;
  selectedPage: number = 0;

  //variables de usuario
  usuarios: UsuarioM[] = [];

  

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {




    this.usuarios = ELEMENT_DATA.map((Usuario) => {
      return {
        id: Usuario.id,
        nombre: Usuario.nombre,
        nombreUser: Usuario.nombreUser,
        rol: Usuario.rol,
        telefono: Usuario.telefono,
        correo: Usuario.correo, 
      };
    });
    this.ObtenerUsuarios();

  }

  limpiarInput() {
    this.buscarTexto = '';
  }

  ObtenerUsuarios() {
    this.http
      .get<any>('http://127.0.0.1:8000/api/Empleados/')
      .subscribe(
        (data) => {
          this.usuarios = [];

          for (const userDataFull of data) {
            const usuario: UsuarioM = {
              id: userDataFull.EmpleadoID,
              nombre: userDataFull.Nombre,
              nombreUser: userDataFull.Usuario,
              rol: userDataFull.Cargo,
              telefono: userDataFull.Telefono,
              correo: userDataFull.CorreoElectronico,
            };
            this.usuarios.push(usuario);


          }
          this.dataSource = this.usuarios;
          console.log('usuarios totales',this.usuarios);

        },
        (error) => {
          console.error('Error fetching data from the API:', error);
        }
      );
  }
  addVideojuego(usuario: User) {
    // Ensure the videojuego object does not have an ID (indicating it's a new videojuego)
  
  
    const apiUrl = `http://127.0.0.1:8000/api/Empleados/`;
  
    // 
    const nuevoUser = {
      Usuario: usuario.Usuario,
      Password: usuario.Password,
      Nombre: usuario.Nombre,
      Cargo: usuario.Cargo,
      Telefono: usuario.Telefono,
      CorreoElectronico: usuario.CorreoElectronico,
      RolID: usuario.RolID, 
    };

    console.log('Data for new videojuego:', nuevoUser);
  
    this.http.post(apiUrl, nuevoUser).subscribe(
      (response: any) => {
        // The server should respond with the newly created videojuego object,
        // including its assigned ID
        const nuevoUser: User = {
          Usuario: response.Usuario,
          Password: response.Password,
          Nombre: response.Nombre,
          Cargo: response.Cargo,
          Telefono: response.Telefono,
          CorreoElectronico: response.CorreoElectronico,
          RolID: response.RolID,
        };
  
  
        // Reassign the updated videojuegos array to the MatTableDataSource
        this.dataSource = this.usuarios;
  
        console.log('New videojuego added successfully.');
      },
      (error) => {
        console.error('Error adding new videojuego:', error);
      }
    );
  }
  

  actualizarTabla() {}

  onPageChange(event: any) {}
}
