import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';

import { AnnonceApi } from '~/api/annonce.api';
import { PhotoApi } from '~/api/photo.api';
import { ProprieteApi } from '~/api/propriete.api';
import { UtilisateurResource, UtilisateurResourceCollection } from '~/api/resource/user.resource';
import { Photo } from '~/models/photo';
import { Utilisateur, UtilisateurCollection } from '~/models/user';

// ---- //
// Type //
// ---- //

interface UserApi
{
  photo: PhotoApi
}

interface AdminApi
{
  annonce: AnnonceApi;
  propriete: ProprieteApi;
  photo: PhotoApi;
}

// -------- //
// Fonction //
// -------- //

/**
 * @see {toUserModel} version observable
 */
const toUser = (
  res: Observable<UtilisateurResource>,
  api: UserApi,
): Observable<Utilisateur> => res.pipe(
  mergeMap((res) => {
    if (!res.photo) {
      return of({
        res: res,
        photo: null,
      });
    }

    return forkJoin({
      res: of(res),
      photo: api.photo.get(res.photo),
    })
  }),
  map(({ res, photo }) => toUserModel(res, photo)),
);

/**
 * Transforme une réponse d'API en une entité model: User
 */
const toUserModel = (
  res: UtilisateurResource,
  photo: Photo | null = null,
  proprietes: Utilisateur['proprietes'] = [],
  annonces: Utilisateur['annonces'] = [],
): Utilisateur => {
  return {
    id: res.id,
    nom: res.nom,
    prenom: res.prenom,
    email: res.email,
    userIdentifier: res.userIdentifier,
    roles: res.roles,
    telephone: res.telephone,
    photo: photo?.chemin || null,
    createdAt: new Date(res.createdAt),
    updatedAt: new Date(res.updatedAt),
    verified: res.verified,
    proprietes,
    annonces,
  };
};

/**
 * @see {toUserModel} version relation
 */
const toUserWithRelationship = (
  res: Observable<UtilisateurResource>,
  api: AdminApi,
): Observable<Utilisateur> => res.pipe(
  mergeMap((res) => {
    const proprietes = res.proprietes.length
      ? forkJoin(res.proprietes.map((p) => api.propriete.get(p)))
      : of([]);

    const annonces = res.annonces.length
      ? forkJoin(res.annonces.map((a) => api.annonce.get(a)))
      : of([]);

    const photo = res.photo
      ? api.photo.get(res.photo)
      : of(null);

    return forkJoin({
      res: of(res),
      photo,
      proprietes,
      annonces,
    })
  }),
  map(({ res, photo, proprietes, annonces }) =>
    toUserModel(res, photo, proprietes, annonces),
  ),
);
// alias vers {toUserWithRelationship}
const toUserWithRelationshipHOF = (
  api: AdminApi
) => (
  res: UtilisateurResource
) => toUserWithRelationship(of(res), api);

/**
 * Transforme une collection de réponse en une collection d'entité model: User
 */
const toUserCollection = (
  resCol: Observable<UtilisateurResourceCollection>,
  api: AdminApi,
): Observable<UtilisateurCollection> => {
  return resCol.pipe(
    mergeMap((resCol) => {
      if (resCol.totalItems === 0) {
        return of({
          res: resCol,
          users: [],
        });
      }

      return forkJoin({
        res: of(resCol),
        users: forkJoin(resCol.member.map(toUserWithRelationshipHOF(api))),
      });
    }),

    map(({ res, users }) => {
      return {
        users: users,
        total: res.totalItems,
        pagination: res.view,
      };
    }),
  );
};

// ------ //
// Export //
// ------ //

export {
  toUser,
  toUserCollection, toUserModel, toUserWithRelationship
};

