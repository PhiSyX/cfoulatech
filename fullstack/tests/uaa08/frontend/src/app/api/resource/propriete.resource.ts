import { ApiPlatformResource } from './api-platform.resource';
import { PhotoResource } from './photo.resource';

/**
 * Resource API Platform: Propriete
 */
export interface ProprieteResource extends ApiPlatformResource<"Propriete">
{
  /**
   * Type de propriété
   */
  type: string;
  /**
   * Prix de la propriété
   */
  prix: number;
  /**
   * Surface mètres carrés de la propriété
   */
  surfaceM2: number;
  /**
   * Nombre de pièces dans la propriété
   */
  nombrePieces: number;
  /**
   * Nombre de chambres dans la propriété
   */
  nombreChambres: number;
  /**
   * Un titre.
   */
  titre: string;
  /**
   * Une description de la propriété.
   */
  description: string;
  /**
   * Date de création
   */
  createdAt: string;
  /**
   * Date de mise à jour
   */
  updatedAt: string;
  /**
   * Adresse liée à cette propriété
   */
  adresse: `/api/adresses/${number}`;
  /**
   * Le propriétaire de cette propriété
   */
  proprietaire: `/api/utilisateurs/${number}`;
  /**
   * Les photos de la propriété
   */
  photos: Array<`/api/propriete_photos/${number}`>;
}

/**
 * Resource API Platform: ProprietePhoto
 */
export interface ProprietePhotoResource extends ApiPlatformResource<"ProprietePhoto">
{
  /**
   * Photo principale ?
   */
  principale: boolean;
  /**
   * Propriété
   */
  propriete: ProprieteResource['@id'];
  /**
   * Photo
   */
  photo: PhotoResource['@id'];
}
