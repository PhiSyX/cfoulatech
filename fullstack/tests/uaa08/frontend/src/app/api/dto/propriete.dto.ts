import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';

import { AdresseApi } from '~/api/adresse.api';
import { PhotoApi } from '~/api/photo.api';
import { ProprietePhotoApi } from '~/api/propriete.api';
import { ProprietePhotoResource, ProprieteResource } from '~/api/resource/propriete.resource';
import { UserApi } from '~/api/user.api';
import { Photo } from '~/models/photo';
import { Propriete, ProprietePhoto } from '~/models/propriete';

// ---- //
// Type //
// ---- //

interface ApiPropriete
{
  adresse: AdresseApi,
  user: UserApi,
  photo: ProprietePhotoApi,
}

interface ApiProprietePhoto
{
  photo: PhotoApi,
}

// -------- //
// Fonction //
// -------- //

/**
 * @see {toProprieteModel} version observable
 */
const toPropriete = (
  res: Observable<ProprieteResource>,
  api: ApiPropriete,
): Observable<Propriete> => res.pipe(
  mergeMap((res) => forkJoin({
    res: of(res),
    adresse: api.adresse.get(res.adresse),
    proprietaire: api.user.get(res.proprietaire),
    photos: forkJoin(res.photos.map((PPhotoRes) => api.photo.get(PPhotoRes))),
  })),
  map(({ res, adresse, proprietaire, photos }) =>
    toProprieteModel(res, photos, adresse, proprietaire),
  ),
);

/**
 * Transforme une réponse d'API en une entié model: Propriete
 */
const toProprieteModel = (
  res: ProprieteResource,
  photos: Propriete['photos'],
  adresse: Propriete['adresse'],
  proprietaire: Propriete['proprietaire'],
): Propriete => {
  const photoPrincipale = (
    photos.find((photo) => photo.principale) ||
    photos.at(0)
  );

  photos = photos.filter((p) => p !== photoPrincipale);

  return {
    createdAt: res.createdAt,
    description: res.description,
    prix: res.prix,
    surfaceM2: res.surfaceM2,
    nombrePieces: res.nombrePieces,
    nombreChambres: res.nombreChambres,
    titre: res.titre,
    type: res.type,
    updatedAt: res.updatedAt,
    id: res.id,
    photos: photos,
    adresse: adresse,
    proprietaire: proprietaire,
    photoPrincipale: photoPrincipale?.photo,
  };
};

/**
 * @see {toProprietePhotoModel} version observable
 */
const toProprietePhoto = (
  res: Observable<ProprietePhotoResource>,
  api: ApiProprietePhoto,
): Observable<ProprietePhoto> => res.pipe(
  mergeMap((res) => forkJoin({
    res: of(res),
    photo: api.photo.get(res.photo),
    // NOTE: pas la peine de récupérer son contenu
    propriete: of(null as unknown as Propriete),
  })),
  map(({ res, photo, propriete }) => toProprietePhotoModel(res, photo, propriete)),
);

/**
 * Transforme une réponse d'API en une entité model : ProprietePhoto
 */
const toProprietePhotoModel = (
  res: ProprietePhotoResource,
  photo: Photo,
  propriete : Propriete,
): ProprietePhoto => {
  return {
    id: res.id,
    principale: res.principale,
    photo: photo,
    propriete,
  };
};

// ------ //
// Export //
// ------ //

export {
  toPropriete,
  toProprietePhoto
};

