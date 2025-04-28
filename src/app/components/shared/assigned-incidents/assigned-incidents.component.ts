import { Component } from '@angular/core';
import { Incident, User } from '../../../app.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/fireauth.service';
import { UserService } from '../../../services/user.service';
import { IncidentService } from '../../../services/incident.service';
import {
  NgFor,
  TitleCasePipe,
  KeyValuePipe,
  CommonModule,
} from '@angular/common';

@Component({
  selector: 'app-assigned-incidents',
  imports: [NgFor, TitleCasePipe, KeyValuePipe, CommonModule],
  templateUrl: './assigned-incidents.component.html',
  styleUrl: './assigned-incidents.component.css',
})
export class AssignedIncidentsComponent {
  loading = false;
  incidents: Incident[] = [];
  groupedIncidents: { [key: string]: Incident[] } = {};

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
          this.groupIncidentsByReporter();
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  groupIncidentsByReporter() {
    this.groupedIncidents = this.incidents.reduce((acc, incident) => {
      const reporterId = incident.assignedTo || 'Unassigned';
      if (!acc[reporterId]) {
        acc[reporterId] = [];
      }
      acc[reporterId].push(incident);
      return acc;
    }, {} as { [key: string]: Incident[] });
  }

  viewIncidents(id: string) {
    return this.router.navigateByUrl(`view/${id}`);
  }

  getUserById(id: string): User {
    return this.userService.getUserById(id)!;
  }
}
