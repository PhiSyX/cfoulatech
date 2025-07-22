import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient, UserPatient } from '../models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService
{
  public static API_ENDPOINT = 'http://localhost:3000/patients';

  constructor(private httpClient: HttpClient)
  {
  }

  findAll(): Observable<Array<Patient>>
  {
    return this.httpClient.get<Array<Patient>>(PatientService.API_ENDPOINT)
  }

  create(model: UserPatient): Observable<Patient>
  {
    return this.httpClient.post<Patient>(
      PatientService.API_ENDPOINT,
      model,
    );
  }

  remove(patient: Patient)
  {
    let endpoint = `${PatientService.API_ENDPOINT}/${patient.id}`;
    return this.httpClient.delete<Array<Patient>>(endpoint);
  }

  update(patient: UserPatient)
  {
    let endpoint = `${PatientService.API_ENDPOINT}/${patient.id}`;
    return this.httpClient.put<Array<Patient>>(endpoint, patient);
  }
}
