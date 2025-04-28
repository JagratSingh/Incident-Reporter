import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/fireauth.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Incident, NewIncident, User } from '../../../app.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IncidentService } from '../../../services/incident.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css',
})
export class CreateIncidentComponent {
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
      assignedTo: ['', Validators.required],
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
    const isDuplicate = this.incidents.some(
      (incident) =>
        incident.description.trim().toLowerCase() === formData.description.trim().toLowerCase() &&
        incident.assignedTo.trim() === formData.assignedTo.trim()
    );
    if (isDuplicate) {
      alert('An incident with the same description already exists for this reporter.');
      return;
    }
    
    const incidentData: NewIncident = {
      title: this.addIncidentForm.value.name,
      description: this.addIncidentForm.value.description,
      priority: this.addIncidentForm.value.priority,
      assignedTo: this.addIncidentForm.value.assignedTo,
      status: 'Open',
      comment: [],
      commentedBy: [],
      timestamp: new Date().toLocaleString('en-IN', { hour12: true }),
    };
    console.log(incidentData);
    this.incidentService.createIncident(incidentData);

    this.router.navigateByUrl('/admin');
    this.addIncidentForm.reset();
  }
}
