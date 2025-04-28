import { Component } from '@angular/core';
import { Incident, User } from '../../../app.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IncidentService } from '../../../services/incident.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/fireauth.service';

@Component({
  selector: 'app-edit-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-incident.component.html',
  styleUrl: './edit-incident.component.css',
})
export class EditIncidentComponent {
  loading = false;
  incidentForm!: FormGroup;
  reporters: User[] = [];
  incidentId: string = '';
  incidentDetails!: Incident;
  priorities = ['low', 'medium', 'high'];
  statues = ['Open', 'In Progress', 'Resolved'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private incidentService: IncidentService,
    private authService: AuthService
  ) {
    this.loading = true;
    this.incidentId = this.activatedRoute.snapshot.params['id'];

    this.incidentService.fetchIncidentById(this.incidentId).then(
      (incident) => {
        if (!incident) {
          this.router.navigate(['dashboard/examiner']);
        }

        const res: Incident = incident as Incident;
        this.incidentDetails = res;

        this.incidentForm = this.fb.group({
          name: [this.incidentDetails.title, [Validators.required]],
          description: [
            this.incidentDetails.description,
            [Validators.required],
          ],
          priority: [this.incidentDetails.priority, Validators.required],
          status: [this.incidentDetails.status, Validators.required],
          assignedTo: [this.incidentDetails.assignedTo, Validators.required],
          resolutionComment: [''],
        });
      },
      (error) => {
        console.log('Error:', error);
      }
    );

    this.userService
      .fetchUsers()
      .then(
        (users) => {
          const reporters = users.filter((user) => user.role === 'reporter');
          this.reporters = reporters;
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  onSubmit() {
    const formData = this.incidentForm.getRawValue();

    const existingComments = this.incidentDetails.comment || [];
    const existingCommentedBy = this.incidentDetails.commentedBy || [];
    const userName = this.authService.getUserName();

    if (formData.resolutionComment) {
      existingComments.push(formData.resolutionComment);
      if (userName) {
        existingCommentedBy.push(userName);
      }
    }

    const updatedIncident: Incident = {
      id: this.incidentId,
      title: this.incidentForm.value.name,
      description: this.incidentForm.value.description,
      priority: this.incidentForm.value.priority,
      assignedTo: this.incidentForm.value.assignedTo,
      status: this.incidentForm.value.status,
      comment: existingComments,
      commentedBy: existingCommentedBy,
    };

    this.incidentService.updateIncident(updatedIncident).then(
      () => {
        console.log('Incident Updated successfully');
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
