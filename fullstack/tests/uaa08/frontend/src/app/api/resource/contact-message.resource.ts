import { ContactMessage } from '~/models/contact-message';
import { ApiPlatformResource, ApiPlatformResourceCollection } from './api-platform.resource';
import { UtilisateurResource } from './user.resource';

/**
 * Resource API Platform: ContactMessage
 */
export interface ContactMessageResource extends ApiPlatformResource<"Contact_Message">
{
  /**
   * Le nom complet
   */
  nomComplet: string;

  /**
   * Adresse mail électronique
   */
  email: string;

  /**
   * Numéro de téléphone
   */
  telephone: string;

  /**
   * Le sujet de contact
   */
  sujet: string;

  /**
   * Le message de contact
   */
  message: string;

  /**
   * Date d'envoi du mail
   */
  createdAt: string;

  /**
   * L'utilisateur enregistré (optionnel)
   */
  utilisateur: UtilisateurResource['@id'] | null;
}


/**
 * Resource Collection API Platform: ContactMessage
 */
export type ContactMessageResourceCollection = ApiPlatformResourceCollection<ContactMessageResource>;

/**
 * Collection de message de contact
 */
export interface ContactMessageCollection
{
  /**
   * Les messages
   */
  messages: Array<ContactMessage>;
  /**
   * Total de messages
   */
  total: number;
  /**
   * Informations concernant la pagination
   */
  pagination: {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;
  };
}
