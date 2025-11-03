import { ApiPlatformResource, ApiPlatformResourceCollection } from './api-platform.resource';
import { ProprieteResource } from './propriete.resource';
import { UtilisateurResource } from './user.resource';

/**
 * Resource API Platform: Annonce
 */
export interface AnnonceResource extends ApiPlatformResource<"Annonce">
{
  /**
   * Utilisateur lié à cette annonce
   */
  utilisateur: UtilisateurResource['@id'];
  /**
   * Propriété liée à cette annonce
   */
  propriete: ProprieteResource['@id'];
  /**
   * Message de l'annonce.
   */
  message: string;
  /**
   * Type de vente
   */
  type: string;
  /**
   * Date de création de l'annonce
   */
  createdAt: string;
}

/**
 * Resource Collection API Platform: Annonce
 */
export type AnnonceResourceCollection = ApiPlatformResourceCollection<AnnonceResource>;
