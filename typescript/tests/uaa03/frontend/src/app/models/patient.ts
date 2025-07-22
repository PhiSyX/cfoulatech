export interface Patient
{
  id: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
}

export interface UserPatient
{
  id?: string;
  nom: string;
  email: string;
  password: string;
  telephone: string;
}
