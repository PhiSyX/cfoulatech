export interface Medecin
{
  id: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
  specialite: string;
}

export interface UserMedecin
{
  id?: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
  specialite: string;
}
