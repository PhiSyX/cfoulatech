import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Medecin, UserMedecin } from '../../models/medecin';
import { Patient, UserPatient } from '../../models/patient';
import { RendezvousApp } from '../../models/rendezvous';
import { TitleService } from '../../services/title.service';
import { MedecinService } from '../../services/medecin.service';
import { PatientService } from '../../services/patient.service';
import { RendezvousService } from '../../services/rendezvous.service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit
{
  public patients: Array<Patient> = [];
  public medecins: Array<Medecin> = [];
  public rendezvous: Array<RendezvousApp> = [];

  public patientModel: UserPatient = {
    nom: "",
    email: "",
    password: "",
    telephone: "",
  };

  public medecinModel: UserMedecin = {
    nom: "",
    email: "",
    password: "",
    telephone: "",
    specialite: "",
  };

  constructor(
    private titleService: TitleService,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private rendezVousService: RendezvousService,
  )
  {
    this.titleService.define('Tableau de bord | Admins');
  }

  ngOnInit()
  {
    this.loadPatients();
    this.loadMedecins();
    this.loadRendezvous();
  }

  loadPatients()
  {
    this.patientService.findAll().subscribe((patients) => {
      this.patients = patients;
    });
  }

  loadMedecins()
  {
    this.medecinService.findAll().subscribe((medecins) => {
      this.medecins = medecins;
    });
  }

  loadRendezvous()
  {
    this.rendezVousService.findAll().subscribe((rendezvous) => {
      this.rendezvous = rendezvous.map((rdv) => {
        return {
          ...rdv,
          medecin: this.medecins.find((m) => m.id === rdv.medecinId),
          patient: this.patients.find((p) => p.id === rdv.patientId),
        };
      });
    });
  }

  beforeNewPatient()
  {
    this.clearModels();
  }

  beforeNewMedecin()
  {
    this.clearModels();
  }

  addPatient(evt: Event)
  {
    evt.preventDefault();

    this.patientService.create(this.patientModel).subscribe(() => {
      this.loadPatients();
      this.clearModels();
    });
  }

  addMedecin(evt: Event)
  {
    evt.preventDefault();

    this.medecinService.create(this.medecinModel).subscribe(() => {
      this.loadMedecins();
      this.clearModels();
    });
  }

  clearModels()
  {
    this.patientModel = {
      id: undefined,
      nom: "",
      email: "",
      password: "",
      telephone: "",
    };

    this.medecinModel = {
      id: undefined,
      nom: "",
      email: "",
      password: "",
      telephone: "",
      specialite: "",
    };
  }

  beforeEditPatient(patient: Patient)
  {
    this.patientModel = { ...patient };
  }

  beforeEditMedecin(medecin: Medecin)
  {
    this.medecinModel = { ...medecin };
  }

  editPatient(evt: Event)
  {
    evt.preventDefault();

    if (!this.patientModel.id) {
      return;
    }

    this.patientService.update(this.patientModel).subscribe(() => {
      this.loadPatients();
      this.clearModels();
    })
  }

  editMedecin(evt: Event)
  {
    evt.preventDefault();

    if (!this.medecinModel.id) {
      return;
    }

    this.medecinService.update(this.medecinModel).subscribe(() => {
      this.loadMedecins();
      this.clearModels();
    })
  }

  deletePatient(patient: Patient)
  {
    if (!window.confirm('Voulez-vous vraiment supprimer ce patient ?')) {
      return;
    }

    this.patientService.remove(patient).subscribe(() => {
      this.loadPatients();
    });
  }

  deleteMedecin(medecin: Medecin)
  {
    if (!window.confirm('Voulez-vous vraiment supprimer ce medecin ?')) {
      return;
    }

    this.medecinService.remove(medecin).subscribe(() => {
      this.loadMedecins();
    });
  }

}
