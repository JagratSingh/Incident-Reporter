import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/fireauth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './manage-user-role.component.html',
  styleUrls: ['./manage-user-role.component.css'],
})
export class ManageUsersComponent {
  loading = false;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  get currentUserId() {
    return this.authService.getUserId();
  }

  get admins() {
    return this.userService
      .getAllUsers()
      .filter((user) => user.role === 'admin');
  }

  get members() {
    return this.userService.getReporters();
  }

  handleMakeUser(userId: string) {
    console.log('User ID:', userId);
    this.loading = true;
    this.userService
      .updateUserRole(userId, 'reporter')
      .then(
        () => {
          console.log('User role updated successfully');
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  handleMakeAdmin(userId: string) {
    console.log('User ID:', userId);
    this.loading = true;
    this.userService
      .updateUserRole(userId, 'admin')
      .then(
        () => {
          console.log('User role updated successfully');
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }
}
