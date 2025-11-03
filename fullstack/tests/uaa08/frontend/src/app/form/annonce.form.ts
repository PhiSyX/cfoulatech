import { AnnonceResource } from '~/api/resource/annonce.resource';
import { ApiResourceCreate_Form } from './api-platform';

/**
 * Formulaire de création d'annonce
 */
export type AnnonceForm = ApiResourceCreate_Form<AnnonceResource>;

/**
 * Formulaire d'édition d'annonce
 */
export type AnnonceEditForm = Partial<AnnonceForm>;
