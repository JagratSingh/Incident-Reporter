import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './services/fireauth.service';
import { AuthGuard } from './auth/auth.guard';

const isLoggedIn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isUserLoggedIn = authService.isUserLoggedIn();
  if (isUserLoggedIn) {
    return true;
  }
  router.navigate(['/login'], { replaceUrl: true });
  return false;
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [isLoggedIn],
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
        canActivate: [AuthGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './components/admin-dashboard/create-incident/create-incident.component'
          ).then((m) => m.CreateIncidentComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './components/admin-dashboard/edit-incident/edit-incident.component'
          ).then((m) => m.EditIncidentComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'admin',
        },
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import(
            './components/shared/view-incident/view-incident.component'
          ).then((m) => m.ViewIncidentComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'manageusers',
        loadComponent: () =>
          import(
            './components/admin-dashboard/manage-user-role//manage-user-role.component'
          ).then((m) => m.ManageUsersComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'admin'
        }
      },
      {
        path: 'assigned-incidents',
        loadComponent: () =>
          import(
            './components/shared/assigned-incidents/assigned-incidents.component'
          ).then((m) => m.AssignedIncidentsComponent),
        canActivate: [AuthGuard],
        // data: {
        //   role: 'admin'
        // }
      },
      {
        path: 'reporter',
        loadComponent: () =>
          import(
            './components/reporter-dashboard/reporter-dashboard.component'
          ).then((m) => m.ReporterDashboardComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'reporter'
        }
      },
      {
        path: 'add',
        loadComponent: () =>
          import(
            './components/reporter-dashboard/add-incident/add-incident.component'
          ).then((m) => m.AddIncidentComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'reporter'
        }
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import(
            './components/reporter-dashboard/update-incident/update-incident.component'
          ).then((m) => m.UpdateIncidentComponent),
        canActivate: [AuthGuard],
        data: {
          role: 'reporter'
        }
      }
    ],
  },
];
