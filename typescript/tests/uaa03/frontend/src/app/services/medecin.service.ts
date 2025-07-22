import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Medecin, UserMedecin } from '../models/medecin';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class MedecinService
{
  public static API_ENDPOINT = 'http://localhost:3000/medecins';

  constructor(private httpClient: HttpClient)
  {
  }

  findAll(): Observable<Array<Medecin>>
  {
    return this.httpClient.get<Array<Medecin>>(MedecinService.API_ENDPOINT)
  }

  create(model: UserMedecin): Observable<Medecin>
  {
    return this.httpClient.post<Medecin>(
      MedecinService.API_ENDPOINT,
      model,
    );
  }

  update(model: UserMedecin)
  {
    let endpoint = `${MedecinService.API_ENDPOINT}/${model.id}`;
    return this.httpClient.put<Array<Medecin>>(endpoint, model);
  }

  remove(model: Patient)
  {
    let endpoint = `${MedecinService.API_ENDPOINT}/${model.id}`;
    return this.httpClient.delete<Array<Patient>>(endpoint);
  }
}
