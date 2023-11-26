import { Component } from '@angular/core';
import {User} from '../../modelos/user'

@Component({
  selector: 'app-creat-user-dialog',
  templateUrl: './creat-user-dialog.component.html',
  styleUrls: ['./creat-user-dialog.component.css']
})
export class CreatUserDialogComponent {

  user!: User;

}
