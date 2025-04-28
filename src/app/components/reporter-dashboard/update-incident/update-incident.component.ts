import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Incident, User } from '../../../app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IncidentService } from '../../../services/incident.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/fireauth.service';

@Component({
  selector: 'app-edit-incident',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css',
})
export class UpdateIncidentComponent {
  loading = false;
  incidentForm!: FormGroup;
  reporters: User[] = [];
  incidentId: string = '';
  incidentDetails!: Incident;
  priorities = ['low', 'medium', 'high'];
  statues = ['Open', 'In Progress', 'Resolved'];

  user: string = '';
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
          this.router.navigate(['dashboard/admin']);
        }

        const res: Incident = incident as Incident;
        this.incidentDetails = res;

        this.incidentForm = this.fb.group({
          name: [
            { value: this.incidentDetails.title, disabled: true },
            [Validators.required],
          ],
          description: [
            { value: this.incidentDetails.description, disabled: true },
            [Validators.required],
          ],
          priority: [
            { value: this.incidentDetails.priority, disabled: true },
            Validators.required,
          ],
          status: [this.incidentDetails.status, Validators.required],
          assignedTo: [
            { value: this.incidentDetails.assignedTo, disabled: true },
            Validators.required,
          ],
          resolutionComment: [''],
        });

        console.log(this.authService.currentUser);
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
    if (!this.incidentForm.valid) {
      alert('Form is invalid. Please fix the errors.');
      return;
    }

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
      title: formData.name,
      description: formData.description,
      priority: formData.priority,
      assignedTo: formData.assignedTo,
      status: formData.status,
      comment: existingComments,
      commentedBy: existingCommentedBy,
    };

    this.incidentService.updateIncident(updatedIncident).then(
      () => {
        console.log('Incident status updated successfully!');
        this.router.navigate(['reporter']);
      },
      (error) => {
        console.error('Error updating incident status:', error);
      }
    );
  }
}
