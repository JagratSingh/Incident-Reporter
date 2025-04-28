import { Component } from '@angular/core';
import { AuthService } from '../../../services/fireauth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }

  handleLogOut() {
    this.authService.logout();
  }

  get userRole() {
    return this.authService.getUserRole();
  }

  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
