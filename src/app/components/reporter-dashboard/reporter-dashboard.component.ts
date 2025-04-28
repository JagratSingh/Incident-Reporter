import { Component } from '@angular/core';
import { Incident, User } from '../../app.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/fireauth.service';
import { UserService } from '../../services/user.service';
import { IncidentService } from '../../services/incident.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporter-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporter-dashboard.component.html',
  styleUrl: './reporter-dashboard.component.css',
})
export class ReporterDashboardComponent {
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
    const userId = this.authService.currentUser?.uid;
    this.incidentService
      .fetchIncidents()
      .then(
        (incidents) => {
          this.incidents = incidents.filter(
            (incident) => incident.assignedTo === userId
          );
          console.log(incidents);
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  addIncident() {
    return this.router.navigateByUrl('add');
  }

  viewIncident(id: string) {
    console.log('All incidents');
    return this.router.navigateByUrl(`view/${id}`);
  }

  editIncident(id: string) {
    return this.router.navigateByUrl(`update/${id}`);
  }

  viewIncidents() {
    console.log('This is view incidents');
    return this.router.navigateByUrl('assigned-incidents');
  }

  getUserById(id: string): User {
    return this.userService.getUserById(id)!;
  }
}
