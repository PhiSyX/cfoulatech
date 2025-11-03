import { AdresseResource } from '~/api/resource/adresse.resource';
import { ApiResourceCreate_Form } from './api-platform';

/**
 * Formulaire de création d'adresse
 */
export type AdresseForm = ApiResourceCreate_Form<AdresseResource>;

/**
 * Formulaire d'édition d'adresse
 */
export type AdresseEditForm = Partial<AdresseForm>;
