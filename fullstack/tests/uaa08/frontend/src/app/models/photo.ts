import { PhotoResource } from '~/api/resource/photo.resource';

/**
 * Entité Model: Photo
 */
export interface Photo
{
  id: PhotoResource['id'];
  chemin: PhotoResource['chemin'];
  description: PhotoResource['description'];
  title: PhotoResource['title'];
}
