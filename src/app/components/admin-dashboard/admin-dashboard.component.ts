import { Component } from '@angular/core';
import { Incident, User } from '../../app.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/fireauth.service';
import { UserService } from '../../services/user.service';
import { IncidentService } from '../../services/incident.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  loading = false;
  incidents: Incident[] = [];

  assignedUser: string[] = ['Unassigned'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private incidentService: IncidentService
  ) {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.incidentService
      .fetchIncidents()
      .then(
        (incidents) => {
          this.incidents = incidents;

          this.assignedUser = incidents.map((incident) => incident.assignedTo);
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  get openIncidents() {
    return this.incidents.filter((i) => i.status === 'Open');
  }

  get inProgressIncidents() {
    return this.incidents.filter((i) => i.status === 'In Progress');
  }

  get resolved() {
    return this.incidents.filter((i) => i.status === 'Resolved');
  }

  addIncident() {
    return this.router.navigateByUrl('create');
  }

  incidentsAssigned() {
    return this.router.navigateByUrl('assigned-incidents');
  }

  viewIncidents(id: string) {
    return this.router.navigateByUrl(`view/${id}`);
  }

  deleteIncident(incident: Incident) {
    const id = incident.id;
    const confirmation = confirm(
      'Are you sure you want to delete this incident?'
    );
    if (confirmation) {
      this.incidentService.deleteIncident(id);
      this.fetchData();
    }
  }

  editIncident(id: string) {
    return this.router.navigateByUrl(`edit/${id}`);
  }

  manageUsers() {
    this.router.navigateByUrl(`manageusers`);
  }

  getUserById(id: string): User {
    return this.userService.getUserById(id)!;
  }
}
