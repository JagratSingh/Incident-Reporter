import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, RouterOutlet],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
