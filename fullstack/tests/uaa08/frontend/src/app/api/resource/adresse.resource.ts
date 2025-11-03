import { ApiPlatformResource } from './api-platform.resource';

/**
 * Resource API Platform: Adresse
 */
export interface AdresseResource extends ApiPlatformResource<"Adresse">
{
  /**
   * Nom de la rue
   */
  rue: string;
  /**
   * Numéro de l'adresse
   */
  numero: string;
  /**
   * Code Postal
   */
  codePostal: number;
  /**
   * Ville
   */
  ville: string;
  /**
   * Pays
   */
  pays: string;
}
