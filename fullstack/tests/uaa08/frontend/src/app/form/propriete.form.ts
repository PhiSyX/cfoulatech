import { ProprieteResource } from '~/api/resource/propriete.resource';
import { ApiResourceCreate_Form } from './api-platform';

/**
 * Formulaire de création de propriété
 */
export type ProprieteForm = ApiResourceCreate_Form<ProprieteResource>;

/**
 * Formulaire d'édition de propriété
 */
export type ProprieteEditForm = Partial<ProprieteForm>;
