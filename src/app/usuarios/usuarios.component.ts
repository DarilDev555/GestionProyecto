import { Component } from '@angular/core';
import { UsuarioM } from '../modelos/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../modelos/user';
import { CreatUserDialogComponent } from './../usuarios/creat-user-dialog/creat-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from './../usuarios/update-user-dialog/update-user-dialog.component';

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
  displayedColumns: string[] = [
    'id',
    'nombre',
    'nombreUser',
    'rol',
    'telefono',
    'correo',
    'accion',
  ];

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
  usuarios2: User[] = [];
  usuariosEnc!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
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
    this.http.get<any>('http://127.0.0.1:8000/api/Empleados/').subscribe(
      (data) => {
        this.usuarios = [];
        this.usuarios2 = [];

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

        for (const user2DataFull of data) {
          const usuario2: User = {
            EmpleadoID: user2DataFull.EmpleadoID,
            Nombre: user2DataFull.Nombre,
            Usuario: user2DataFull.Usuario,
            Password: user2DataFull.Password,
            Cargo: user2DataFull.Cargo,
            Telefono: user2DataFull.Telefono,
            CorreoElectronico: user2DataFull.CorreoElectronico,
            RolID: user2DataFull.RolID,
          };
          this.usuarios2.push(usuario2);
        }

        this.dataSource = this.usuarios;
        console.log('usuarios totales', this.usuarios);
        this.totalItems = this.usuarios2.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        this.onPageChange({ pageIndex: this.currentPage - 1 });
      },
      (error) => {
        console.error('Error fetching data from the API:', error);
      }
    );
  }
  addEmpleado(usuario: User) {
    // Ensure the videojuego object does not have an ID (indicating it's a new videojuego)

    const apiUrl = `http://127.0.0.1:8000/api/Empleados/`;

    //
    const nuevoUser = {
      EmpleadoID: usuario.EmpleadoID,
      Usuario: usuario.Usuario,
      Password: usuario.Password,
      Nombre: usuario.Nombre,
      Cargo: usuario.Cargo,
      Telefono: usuario.Telefono,
      CorreoElectronico: usuario.CorreoElectronico,
      RolID: usuario.RolID,
    };

    console.log('Data for new Usuario:', nuevoUser);

    this.http.post(apiUrl, nuevoUser).subscribe(
      (response: any) => {
        // The server should respond with the newly created videojuego object,
        // including its assigned ID
        const nuevoUser: User = {
          EmpleadoID: 0,
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

        console.log('New User added successfully.');
      },
      (error) => {
        console.error('Error adding new User:', error);
      }
    );
  }

  openCreateDialog() {
    console.log('Opening dialog...');

    const dialogRef = this.dialog.open(CreatUserDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('que es lo que estoy agregando:', result);

      if (result) {
        this.addEmpleado(result);
      }
    });
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

  openUpdateDialog(usuario: User) {
    console.log('Opening update...', usuario);

    if (usuario) {
      const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
        width: '600px',
        data: usuario, // Pass a copy of the user data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedUsuario: User) => {
        if (updatedUsuario) {
          //this.buscarUser(updatedUsuario) ;
          this.updateUsuario(updatedUsuario);
        }
      });
    }
  }
  updateUsuario(usuario: User) {
    if (!usuario) {
      console.error('user ID is missing.');
      return;
    }

    const apiUrl = `http://127.0.0.1:8000/api/Empleados/${usuario.EmpleadoID}/`;

    // Make sure the videojuego object has all the required properties
    const updatedUserData: User = {
      EmpleadoID: usuario.EmpleadoID,
      Usuario: usuario.Usuario,
      Password: usuario.Password,
      Nombre: usuario.Nombre,
      Cargo: usuario.Cargo,
      Telefono: usuario.Telefono,
      CorreoElectronico: usuario.CorreoElectronico,
      RolID: usuario.RolID,
    };

    console.log('url:', apiUrl, 'user:', updatedUserData);
    this.http.put(apiUrl, updatedUserData).subscribe(
      () => {
        // Update success logic
        console.log('User updated successfully.');
      },
      (error) => {
        // Update error logic
        console.error('Error updating user:', error);
      }
    );
  }

  actualizarTabla() {
    console.log('Lista de productos de ELEMENT_DATA', ELEMENT_DATA);
    this.ObtenerUsuarios();
    this.dataSource = this.usuarios;
  }

  deleteUser(EmpleadoID: number) {
    const apiUrl = `http://127.0.0.1:8000/api/Empleados/${EmpleadoID}`;

    this.http.delete(apiUrl).subscribe(
      () => {
        // On successful deletion, remove the user from the users array
        this.usuarios = this.usuarios.filter(
          (usuario) => usuario.id !== EmpleadoID
        );

        // Reassign the updated users array to the MatTableDataSource
        this.dataSource = this.usuarios;

        console.log('User deleted successfully.');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  onPageChange(event: any) {
    if (event.pageSize == undefined) {
      console.log('item por pag seleccionada', event.pageSize);
      this.itemsPerPage = 5;
    } else {
      this.itemsPerPage = event.pageSize;
    }

    this.currentPage = event.pageIndex + 1;

    // Obtener los productos de la página actual directamente desde this.productosTotales
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.usuarios.slice(startIndex, endIndex);
  }

  getCurrentPageProductos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.usuarios.slice(startIndex, endIndex);
  }

  buscarUsuarioT() {
    const buscarTexto = this.buscarTexto.trim(); // Elimina espacios en blanco alrededor
    const id = parseInt(buscarTexto);

    console.log('texto:', buscarTexto);
    console.log('totales:', this.usuarios);

    if (!isNaN(id)) {
      // Si la conversión a número es exitosa, busca por ID
      const usuarioExistente = this.usuarios.find(
        (usuario) => usuario.id === id
      );

      if (usuarioExistente) {
        this.elementDataToUser(usuarioExistente);
        console.log('Encontrado (por ID):', usuarioExistente);
      } else {
        console.log('Producto no encontrado (por ID)', usuarioExistente);
      }
    } else {
      // Si no es un número, busca por nombre
      const nombre = buscarTexto.toLowerCase(); // Convierte el texto de búsqueda a minúsculas

      const usuarioExistente = this.usuarios.find(
        (usuario) => usuario.nombre.toLowerCase() === nombre
      );

      if (usuarioExistente) {
        console.log('Encontrado (por nombre):', usuarioExistente);
        this.elementDataToUser(usuarioExistente);
      } else {
        console.log('Producto no encontrado (por nombre)');
      }
    }
  }
  elementDataToUser(usuario: UsuarioM) {
    // Crea una nueva matriz de un solo elemento con el producto
    const newElementData: PeriodicElement[] = [
      {
        id: usuario.id,
        nombre: usuario.nombre,
        nombreUser: usuario.nombreUser,
        rol: usuario.rol,
        telefono: usuario.telefono,
        correo: usuario.correo,
      },
    ];

    // Actualiza dataSource para reflejar los cambios
    this.dataSource = newElementData;
    console.log('elementdata:', ELEMENT_DATA);
    console.log('datasource:', this.dataSource);
  }
}
