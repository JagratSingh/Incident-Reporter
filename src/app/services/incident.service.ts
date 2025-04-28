import { Injectable } from '@angular/core';
import { AuthService } from '../services/fireauth.service';
import { FireStoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { Incident, NewIncident } from '../app.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidents: Incident[] = [];
  loading = true;
  private refreshNeeded$ = new Subject<boolean>();

  constructor(private firestore: FireStoreService) {
    this.loading = true;
    this.fetchIncidents()
      .then(
        (incidents) => {
          this.incidents = incidents;
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  fetchIncidents() {
    return this.firestore.getCollection('incident');
  }

  createIncident(incident: NewIncident) {
    return this.firestore.addDocument('incident', incident);
  }

  fetchIncidentById(id: string) {
    return this.firestore.getDocument(`incident/${id}`);
  }

  deleteIncident(id: string) {
    return this.firestore.deleteDocument(`incident/${id}`);
  }

  updateIncident(incident: Incident) {
    return this.firestore
      .updateDocument(`incident/${incident.id}`, incident)
      .then(
        () => {
          const index = this.incidents.findIndex((t) => t.id === incident.id);
          this.incidents[index] = incident;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }
}
