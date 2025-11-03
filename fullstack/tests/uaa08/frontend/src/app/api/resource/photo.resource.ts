import { ApiPlatformResource } from './api-platform.resource';

/**
 * Resource API Platform: Photo
 */
export interface PhotoResource extends ApiPlatformResource<"Photo">
{
  /**
   * Chemin de la photo.
   */
  chemin: string;
  /**
   * Description de la photo.
   */
  description: string | null;
  /**
   * Titre de la photo.
   */
  title: string | null;
}
