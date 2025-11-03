import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';

import { ProprieteApi } from '~/api/propriete.api';
import { AnnonceResource, AnnonceResourceCollection } from '~/api/resource/annonce.resource';
import { UserApi } from '~/api/user.api';
import { Annonce, AnnonceCollection } from '~/models/annonce';

// ---- //
// Type //
// ---- //

interface Api
{
  user: UserApi,
  propriete: ProprieteApi,
}

// -------- //
// Fonction //
// -------- //

/**
 * @see {toAnnonceModel} avec les relations
 */
const toAnnonceModelWithRelationship = (api: Api) => (res: AnnonceResource) =>
  forkJoin({
    res: of(res),
    utilisateur: api.user.get(res.utilisateur),
    propriete: api.propriete.get(res.propriete),
  })
  .pipe(map(({ res, propriete, utilisateur }) =>
    toAnnonceModel(res, propriete, utilisateur)
  ))
;

/**
 * @see {toAnnonceModel} version obserable
 */
const toAnnonce = (
  res: Observable<AnnonceResource>,
  api: Api,
) => res.pipe(mergeMap(toAnnonceModelWithRelationship(api)));

/**
 * Transforme une réponse de l'API en une entité model: Annonce.
 */
const toAnnonceModel = (
  res: AnnonceResource,
  propriete: Annonce['propriete'],
  utilisateur: Annonce['utilisateur'],
): Annonce => {
  return {
    id: res.id,
    type: res.type,
    message: res.message,
    createdAt: new Date(res.createdAt),
    propriete,
    utilisateur,
  };
};

const toAnnonceCollection = (
  resCol: Observable<AnnonceResourceCollection>,
  api: Api,
): Observable<AnnonceCollection> => resCol.pipe(
  mergeMap((resCol) => {
    if (resCol.totalItems === 0) {
      return of({
        resource: resCol,
        annonces: [],
      });
    }

    return forkJoin({
      resource: of(resCol),
      annonces: forkJoin(resCol.member.map(toAnnonceModelWithRelationship(api))),
    });
  }),

  map(({ resource, annonces }) => ({
    annonces,
    total: resource.totalItems,
    pagination: resource.view,
  })),
);

// ------ //
// Export //
// ------ //

export {
  toAnnonce,
  toAnnonceCollection
};

