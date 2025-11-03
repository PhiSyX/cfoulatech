import { AnnonceResource } from './annonce.resource';
import { ApiPlatformResource, ApiPlatformResourceCollection } from './api-platform.resource';
import { PhotoResource } from './photo.resource';
import { ProprieteResource } from './propriete.resource';

export type UserRole = "ROLE_CLIENT" | "ROLE_PROPRIETAIRE" | "ROLE_ADMIN";

/**
 * Resource API Platform: Utilisateur
 */
export interface UtilisateurResource extends ApiPlatformResource<"Utilisateur">
{
  /**
   * Les rôles de l'utilisateur
   */
  roles: Array<UserRole>;
  /**
   * Prénom de l'utilisateur
   */
  prenom: string;
  /**
   * Nom de l'utilisateur
   */
  nom: string;
  /**
   * Adresse électronique de l'utilisateur
   */
  email: string;
  /**
   * Numéro de téléphone de l'utilisateur
   */
  telephone: string;
  /**
   * Avatar de l'utilisateur
   */
  photo: PhotoResource['@id'] | null;
  /**
   * Identifiant de connexion de l'utilisateur
   */
  userIdentifier: string;
  /**
   * Date de création de l'utilisateur
   */
  createdAt: string;
  /**
   * Date de mise à jour des données de l'utilisateur
   */
  updatedAt: string;

  /**
   * Est-ce que l'utilisateur est vérifié ?
   */
  verified: boolean;

  /**
   * Les propriétés de l'utilisateur
   */
  proprietes: Array<ProprieteResource['@id']>;

  /**
   * Les annonces de l'utilisateur
   */
  annonces: Array<AnnonceResource['@id']>;
}


/**
 * Resource Collection API Platform: Utilisateur
 */
export type UtilisateurResourceCollection = ApiPlatformResourceCollection<UtilisateurResource>;
