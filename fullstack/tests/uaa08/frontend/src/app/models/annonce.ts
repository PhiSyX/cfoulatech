import { AnnonceResource } from '~/api/resource/annonce.resource';
import { Propriete } from './propriete';
import { Utilisateur } from './user';

/**
 * Entité Model: Annonce
 */
export interface Annonce
{
  id: AnnonceResource['id'];
  message: AnnonceResource['message'];
  type: AnnonceResource['type'];
  utilisateur: Utilisateur;
  propriete: Propriete;
  createdAt: Date;
}

/**
 * Collection d'Annonce
 */
export interface AnnonceCollection
{
  /**
   * Les annonces
   */
  annonces: Array<Annonce>;
  /**
   * Total d'annonces
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
