import { map, Observable } from 'rxjs';

import { AdresseResource } from '~/api/resource/adresse.resource';
import { Adresse } from '~/models/adresse';

// -------- //
// Fonction //
// -------- //

/**
 * @see {toAdresseModel} Version observable
 */
const toAdresse = (
  res: Observable<AdresseResource>,
): Observable<Adresse> => res.pipe(map(toAdresseModel));

/**
 * Transforme une réponse de l'API en une entité Model : Adresse.
 */
const toAdresseModel = (res: AdresseResource): Adresse => {
  return {
    id: res.id,
    rue: res.rue,
    ville: res.ville,
    pays: res.pays,
    numero: res.numero,
    codePostal: res.codePostal,
  };
};

// ------ //
// Export //
// ------ //

export {
  toAdresse
};

