import { Injectable } from '@angular/core';
import { FireStoreService } from './firestore.service';
import { User } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  userLoading = false;

  constructor(private firestoreService: FireStoreService) {
    this.userLoading = true;
    this.fetchUsers()
      .then(
        (users) => {
          this.setUser(users);
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.userLoading = false;
      });
  }

  fetchUsers() {
    return this.firestoreService.getCollection('users');
  }

  setUser(users: User[]) {
    this.users = users;
  }

  getReporters() {
    return this.users.filter((user) => user.role === 'reporter');
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.uid === id);
  }

  updateUserRole(id: string, role: 'admin' | 'reporter') {
    const user = this.users.find((user) => user.uid === id);
    if (user) {
      user.role = role;
    }
    return this.firestoreService.updateDocument(`users/${id}`, user);
  }
}