import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

import { Medecin } from '../../models/medecin';
import { RendezvousApp } from '../../models/rendezvous';
import { MedecinService } from '../../services/medecin.service';
import { RendezvousService } from '../../services/rendezvous.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-dashboard-patient',
  imports: [
    NgForOf,
  ],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.css',
})
export class DashboardPatientComponent implements OnInit
{
  public rendezvous: Array<RendezvousApp> = [];
  private medecins: Array<Medecin> = [];

  constructor(
    private titleService: TitleService,
    private medecinService: MedecinService,
    private rendezvousService: RendezvousService,
  )
  {
    this.titleService.define('Tableau de bord | Patients');
  }

  ngOnInit()
  {
    this.loadMedecins();
    this.loadRendezvous();
  }

  loadMedecins()
  {
    this.medecinService.findAll().subscribe((medecins) => {
      this.medecins = medecins;
    })
  }

  loadRendezvous()
  {
    let patient = window.localStorage.getItem("id")!;

    this.rendezvousService.filterPatient(patient).subscribe((rendezvous) => {
      this.rendezvous = rendezvous.map((rdv) => {
        return {
          ...rdv,
          medecin: this.medecins.find((m) => m.id == rdv.medecinId),
        };
      });
    });
  }
}
