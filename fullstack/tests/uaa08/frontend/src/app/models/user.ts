import { UtilisateurResource } from '~/api/resource/user.resource';
import { Annonce } from './annonce';
import { Propriete } from './propriete';

/**
 * Entité Model: Utilisateur
 */
export interface Utilisateur
{
  id: UtilisateurResource['id'];
  prenom: UtilisateurResource['prenom'];
  roles: UtilisateurResource['roles'];
  nom: UtilisateurResource['nom'];
  email: UtilisateurResource['email'];
  telephone: UtilisateurResource['telephone'];
  photo: string | null;
  proprietes: Array<Propriete>;
  annonces: Array<Annonce>;
  userIdentifier: UtilisateurResource['userIdentifier'];
  createdAt: Date;
  updatedAt: Date;
  verified: UtilisateurResource['verified'];
}

/**
 * Collection d'User
 */
export interface UtilisateurCollection
{
  /**
   * Les utilisateurs
   */
  users: Array<Utilisateur>;
  /**
   * Total des utilisateurs
   */
  total: number;
  /**
   * Informations concernant la pagination
   */
  pagination: {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;
  };
}

