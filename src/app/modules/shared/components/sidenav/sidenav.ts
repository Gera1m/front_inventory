import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../material-module";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule,MaterialModule,RouterOutlet],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {

}
