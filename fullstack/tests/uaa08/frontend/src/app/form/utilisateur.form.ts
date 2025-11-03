import { Utilisateur } from '~/models/user';

/**
 * Formulaire de création d'utilisateur
 */
export interface UtilisateurCreateForm
{
  /**
   * Prénom de l'utilisateur
   */
  prenom: string;
  /**
   * Nom de l'utilisateur
   */
  nom: string;
  /**
   * Adresse électronique mail de l'utilisateur
   */
  email: string;
  /**
   * Numéro de GSM/Téléphone de l'utilisateur
   */
  telephone: string;
  /**
   * Mot de passe en clair de l'utilisateur
   */
  plainPassword: string;

  /**
   * Role utilisateur (le rôle `ROLE_ADMIN` est interdit.)
   */
  role?: "ROLE_PROPRIETAIRE" | "ROLE_CLIENT";
}

/**
 * Formulaire d'édition d'un utilisateur
 */
export type UtilisateurUpdateForm = Partial<UtilisateurCreateForm>;

/**
 * Formulaire d'édition d'un utilisateur par un admin
 */
export type AdminUtilisateurUpdateForm = Partial<Omit<Utilisateur, "id">>;
