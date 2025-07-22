import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Patient } from '../../models/patient';
import { RendezvousApp } from '../../models/rendezvous';
import { PatientService } from '../../services/patient.service';
import { RendezvousService } from '../../services/rendezvous.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-dashboard-medecin',
  imports: [
    NgForOf,
  ],
  templateUrl: './dashboard-medecin.component.html',
  styleUrl: './dashboard-medecin.component.css',
})
export class DashboardMedecinComponent implements OnInit
{
  public rendezvous: Array<RendezvousApp> = [];
  private patients: Array<Patient> = [];

  constructor(
    private titleService: TitleService,
    private patientService: PatientService,
    private rendezvousService: RendezvousService,
  )
  {
    this.titleService.define('Tableau de bord | Médecins');
  }

  ngOnInit()
  {
    this.loadPatients();
    this.loadRendezvous();
  }

  loadPatients()
  {
    this.patientService.findAll().subscribe((patients) => {
      this.patients = patients;
    })
  }

  loadRendezvous()
  {
    let medecin = window.localStorage.getItem("id")!;
    this.rendezvousService.filterMedecin(medecin).subscribe((rendezvous) => {
      this.rendezvous = rendezvous.map((rdv) => {
        return {
          ...rdv,
          patient: this.patients.find((patient) => patient.id === rdv.patientId),
        }
      });
    });
  }
}
