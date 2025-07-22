import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { Admin } from '../models/admin';
import { Medecin } from '../models/medecin';
import { Patient } from '../models/patient';
import { AdminService } from "./admin.service";
import { MedecinService } from './medecin.service';
import { PatientService } from './patient.service';

interface ConnectedUser
{
  id: string;
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class LoginService
{
  private connectedUserData: BehaviorSubject<ConnectedUser | null | undefined> = new BehaviorSubject(undefined as any);

  constructor(private httpClient: HttpClient)
  {
  }

  connectedUser()
  {
    return this.connectedUserData.asObservable();
  }

  logout()
  {
    this.connectedUserData.next(null);
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("role");
  }

  loginForAdmin(email: string, password: string): Observable<Admin | null>
  {
    let endpoint = `${AdminService.API_ENDPOINT}/?email=${email}&password=${password}`;
    let obs = this.httpClient.get<Array<Admin>>(endpoint).pipe(
      map((users) => users.at(0) ?? null),
    );

    obs.subscribe((u) => {
      if (!u) {
        return;
      }

      this.connectedUserData.next({
        id: u.id,
        role: "admin",
      });
    });

    return obs;
  }

  loginForMedecin(email: string, password: string): Observable<Medecin | null>
  {
    let endpoint = `${MedecinService.API_ENDPOINT}/?email=${email}&password=${password}`;
    let obs = this.httpClient.get<Array<Medecin>>(endpoint).pipe(
      map((users) => users.at(0) ?? null),
    );
    obs.subscribe((u) => {
      if (!u) {
        return;
      }

      this.connectedUserData.next({
        id: u.id,
        role: "medecin",
      });
    });
    return obs;
  }

  loginForPatient(email: string, password: string): Observable<Patient | null>
  {
    let endpoint = `${PatientService.API_ENDPOINT}/?email=${email}&password=${password}`;
    let obs = this.httpClient.get<Array<Patient>>(endpoint).pipe(
      map((users) => users.at(0) ?? null),
    );
    obs.subscribe((u) => {
      if (!u) {
        return;
      }

      this.connectedUserData.next({
        id: u.id,
        role: "patient",
      });
    });
    return obs;
  }
}
