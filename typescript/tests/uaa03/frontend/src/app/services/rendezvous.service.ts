import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rendezvous } from '../models/rendezvous';
import { HttpClient } from '@angular/common/http';
import { Medecin } from '../models/medecin';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService
{
  public static API_ENDPOINT = 'http://localhost:3000/rendezvous';

  constructor(private httpClient: HttpClient)
  {
  }


  findAll(): Observable<Array<Rendezvous>>
  {
    return this.httpClient.get<Array<Rendezvous>>(RendezvousService.API_ENDPOINT)
  }

  filterPatient(patient: Patient["id"])
  {
    let endpoint = `${RendezvousService.API_ENDPOINT}?patientId=${patient}`;
    return this.httpClient.get<Array<Rendezvous>>(endpoint)
  }

  filterMedecin(medecin: Medecin["id"])
  {
    let endpoint = `${RendezvousService.API_ENDPOINT}?medecinId=${medecin}`;
    return this.httpClient.get<Array<Rendezvous>>(endpoint)
  }
}
