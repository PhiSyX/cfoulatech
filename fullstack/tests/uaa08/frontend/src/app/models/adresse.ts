import { AdresseResource } from '~/api/resource/adresse.resource';

/**
 * Entité Model: Adresse
 */
export interface Adresse
{
  id: AdresseResource['id'];
  rue: AdresseResource['rue'];
  numero: AdresseResource['numero'];
  codePostal: AdresseResource['codePostal'];
  ville: AdresseResource['ville'];
  pays: AdresseResource['pays'];
}
