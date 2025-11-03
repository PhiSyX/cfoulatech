import { ProprietePhotoResource, ProprieteResource } from '~/api/resource/propriete.resource';
import { Adresse } from './adresse';
import { Photo } from './photo';
import { Utilisateur } from './user';

/**
 * Entité Model: Propriete
 */
export interface Propriete
{
  id: ProprieteResource['id'];
  type: ProprieteResource['type'];
  prix: ProprieteResource['prix'];
  surfaceM2: ProprieteResource['surfaceM2'];
  nombrePieces: ProprieteResource['nombrePieces'];
  nombreChambres: ProprieteResource['nombreChambres'];
  titre: ProprieteResource['titre'];
  description: ProprieteResource['description'];
  createdAt: ProprieteResource['createdAt'];
  updatedAt: ProprieteResource['updatedAt'];
  adresse: Adresse;
  proprietaire: Utilisateur;
  photos: Array<ProprietePhoto>;
  photoPrincipale: Photo | undefined;
}

/**
 * Entité Model: ProprietePhoto
 */
export interface ProprietePhoto
{
  id: ProprietePhotoResource['id'];
  principale: ProprietePhotoResource['principale'];
  propriete: Propriete;
  photo: Photo;
}
