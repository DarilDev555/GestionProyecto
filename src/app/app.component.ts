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

  login() { 
      this.router.navigate(['/productos']);
      console.log('voy al dash')
  }
  // button to open another component
  goToProveedores() {
    this.router.navigate(['/proveedores']);
  }
}


