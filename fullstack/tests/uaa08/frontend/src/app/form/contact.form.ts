import { UtilisateurResource } from '~/api/resource/user.resource';

/**
 * Formulaire se trouvant dans la page `/contact-us`
 */
export interface ContactUsForm
{
  /**
   * Nom complet de l'utilisateur souhaitant contacter ImmauWeb.
   */
  nomComplet: string;
  /**
   * Adresse électronique mail de l'utilisateur souhaitant contacter ImmauWeb.
   */
  email: string;
  /**
   * Numéro de GMS/Téléphone de l'utilisateur souhaitant contacter ImmauWeb.
   */
  telephone: string;
  /**
   * Sujet/Objet de contact.
   */
  sujet: string;
  /**
   * Message de contact.
   */
  message: string;

  /**
   * Utilisateur enregistré de la plateforme.
   */
  utilisateur?: UtilisateurResource['@id'];
}
