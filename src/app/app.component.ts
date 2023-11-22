import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GestionVerduleria';
  constructor(private router: Router ){
    
  }
  name = '';
  userName = '';
  imag = '';
  isDrawerOpened = false;
  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }


  toLogin() {
    this.router.navigate(['']);
    this.toggleDrawer();
  }

  goToProveedores() {
    this.router.navigate(['/proveedores']);
    this.toggleDrawer();
  }

  toHome() {
    this.router.navigate(['/dashboard']);
    this.toggleDrawer();
  }
}


