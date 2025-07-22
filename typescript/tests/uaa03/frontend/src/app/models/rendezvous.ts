import { Medecin } from './medecin';
import { Patient } from './patient';

export interface Rendezvous
{
  id: string;
  date: string;
  heure: string;
  patientId: string;
  medecinId: string;
  etat: string;
}

export interface RendezvousApp
{
  id: string;
  date: string;
  heure: string;
  patient?: Patient;
  medecin?: Medecin;
  etat: string;
}
