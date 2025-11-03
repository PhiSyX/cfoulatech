import { ContactMessageResource } from '~/api/resource/contact-message.resource';
import { Utilisateur } from './user';

/**
 * Entité Model: ContactMessage
 */
export interface ContactMessage
{
  nomComplet: ContactMessageResource['nomComplet'];
  email: ContactMessageResource['email'];
  telephone: ContactMessageResource['telephone'];
  sujet: ContactMessageResource['sujet'];
  message: ContactMessageResource['message'];
  createdAt: Date;
  utilisateur: Utilisateur | null;
}
