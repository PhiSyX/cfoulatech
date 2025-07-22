import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  DashboardAdminComponent,
} from './pages/dashboard-admin/dashboard-admin.component';
import {
  DashboardMedecinComponent,
} from './pages/dashboard-medecin/dashboard-medecin.component';
import {
  DashboardPatientComponent,
} from './pages/dashboard-patient/dashboard-patient.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent,
  },
  {
    path: "admin/dashboard",
    pathMatch: "full",
    component: DashboardAdminComponent,
  },
  {
    path: "medecin/dashboard",
    pathMatch: "full",
    component: DashboardMedecinComponent,
  },
  {
    path: "patient/dashboard",
    pathMatch: "full",
    component: DashboardPatientComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
