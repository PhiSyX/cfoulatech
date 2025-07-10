package exo.restaurant;

import exo.restaurant.entity.Commande;
import exo.restaurant.entity.Plat;
import exo.restaurant.enums.StatusCommande;
import exo.restaurant.enums.TypePlat;
import exo.restaurant.exceptions.CommandeImpossibleException;
import exo.restaurant.exceptions.PrixInvalideException;
import exo.restaurant.exceptions.QuantiteInvalideException;

public class AppRestaurant
{
	public static void main(String[] args)
	{
		// region cas plats
		// Ok
//		nouveauPlat("Salade", 12.50);
		// Erreur PrixInvalideException
//		nouveauPlat("RIEN", 0.0);
		// endregion cas plats

		// region cas commandes
		// Ok
//		nouvelleCommande(4);
		// Erreur QuantiteInvalideException
//		nouvelleCommande(0);
		// Erreur CommandeImpossibleException
//		nouvelleCommande(StatusCommande.ANNULEE, Checked.Continue);
//		nouvelleCommande(StatusCommande.ANNULEE, Checked.Failed);
		// endregion cas commandes
	}

	private static void nouvelleCommande(int quantite)
	{
		try {
			LogsManager.ajouterLog("Début de création d'une commande");
			Plat plat = new Plat("Salade", 12.50, TypePlat.ENTREE);
			Commande commande = new Commande(212);
			commande.ajouterPlat(plat, quantite);
			LogsManager.ajouterLog("Succès de création d'une commande");
		} catch (QuantiteInvalideException e) {
			LogsManager.ajouterLog("Erreur lors de création de la commande : " + e.getMessage());
		} finally {
			LogsManager.afficherEtViderLogs();
		}
	}

	private static void nouvelleCommande(StatusCommande statusCommande, Checked failed)
	{
		try {
			LogsManager.ajouterLog("Début de création d'une commande");
			Plat plat = new Plat("Salade", 12.50, TypePlat.ENTREE);
			Commande commande = new Commande(212);
			commande.ajouterPlat(plat, 1);
			commande.changerStatus(statusCommande);
			if (failed == Checked.Failed) {
				commande.changerStatus(StatusCommande.ANNULEE);
			}
			LogsManager.ajouterLog("Succès de création d'une commande");
		} catch (CommandeImpossibleException e) {
			LogsManager.ajouterLog("Erreur lors de création de la commande : " + e.getMessage());
		} finally {
			LogsManager.afficherEtViderLogs();
		}
	}

	private static void nouveauPlat(String Salade, double prix)
	{
		try {
			LogsManager.ajouterLog("Début de création d'un plat");
			Plat plat = new Plat(Salade, prix, TypePlat.ENTREE);
			LogsManager.ajouterLog("Succès de création du plat");
		} catch (PrixInvalideException e) {
			LogsManager.ajouterLog("Erreur lors de création du plat : " + e.getMessage());
		} finally {
			LogsManager.afficherEtViderLogs();
		}
	}
}

enum Checked
{
	Failed,
	Continue
}
