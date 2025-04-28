import { Component } from '@angular/core';
import { Incident, User } from '../../../app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../../services/incident.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-incident',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-incident.component.html',
  styleUrl: './view-incident.component.css',
})
export class ViewIncidentComponent {
  incident!: Incident;
  loading = false;
  id: string = '';

  constructor(
    private router: Router,
    private incidentService: IncidentService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params['id'];

    this.incidentService
      .fetchIncidentById(this.id)
      .then(
        (incident) => {
          if (!incident) {
            this.router.navigateByUrl('/dashboard/reporter');
          }

          const res: Incident = incident as Incident;
          this.incident = res;
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }
  getUserById(id: string): User {
    return this.userService.getUserById(id)!;
  }
}
