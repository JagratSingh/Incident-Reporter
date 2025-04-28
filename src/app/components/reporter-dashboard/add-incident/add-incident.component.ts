import { Component } from '@angular/core';
import { Incident, NewIncident, User } from '../../../app.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/fireauth.service';
import { IncidentService } from '../../../services/incident.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-incident.component.html',
  styleUrl: './add-incident.component.css',
})
export class AddIncidentComponent {
  addIncidentForm!: FormGroup;
  incidents: Incident[] = [];
  reporters: User[] = [];

  priorities = ['low', 'medium', 'high'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private incidentService: IncidentService,
    private userService: UserService
  ) {
    this.addIncidentForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', Validators.required],
    });

    this.userService.fetchUsers().then((users) => {
      const reporters = users.filter((user) => user.role === 'reporter');
      this.reporters = reporters;
    });

    this.incidentService.fetchIncidents().then((incidents) => {
      this.incidents = incidents;
    });
  }

  onSubmit() {
    if (!this.addIncidentForm.valid) {
      console.log(this.addIncidentForm.value);
      alert('Form is incorrect');
      return;
    }

    const formData = this.addIncidentForm.value;

    const reporterId = this.authService.getUserId() || 'Unassigned';

    // Check for duplicate incidents
    const isDuplicate = this.incidents.some(
      (incident) =>
        incident.description.trim().toLowerCase() === formData.description.trim().toLowerCase() &&
        incident.assignedTo.trim() === formData.assignedTo.trim()
    );

    if (isDuplicate) {
      alert(
        'An incident with the same description already exists for this reporter.'
      );
      return;
    }

    const incidentData: NewIncident = {
      title: this.addIncidentForm.value.name,
      description: this.addIncidentForm.value.description,
      priority: this.addIncidentForm.value.priority,
      assignedTo: this.authService.getUserId() || 'Unassigned',
      status: 'Open',
      comment: [],
      commentedBy: [],
      timestamp: new Date().toLocaleString('en-IN', { hour12: true }),
    };
    console.log(incidentData);
    this.incidentService.createIncident(incidentData);

    this.router.navigateByUrl('/reporter');
    this.addIncidentForm.reset();
  }
}
