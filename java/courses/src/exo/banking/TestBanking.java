package exo.banking;

import exo.banking.exceptions.CompteIntrouvableException;
import exo.banking.exceptions.MontantInvalideException;
import exo.banking.exceptions.SoldeInsuffisantException;
import exo.banking.records.Compte;
import exo.banking.records.ResultatOperation;

public class TestBanking
{
	public static void main(String[] args)
	{
		Compte mike = new Compte("1", "Mike", 1_000_000);
		Compte momo = new Compte("2", "Momo", 2_000_000);

		GestionnaireBanque banque = new GestionnaireBanque();
		banque.ajouterCompte(mike);
		banque.ajouterCompte(momo);
		banque.ajouterCompte(mike);

		// region cas debiter
		// OK
		debiter(banque, mike.numero(), 500);
		// Erreur MontantInvalideException
		debiter(banque, mike.numero(), 0);
		// Erreur SoldeInsuffisantException
		debiter(banque, mike.numero(), 1_000_000);
		// endregion cas debiter

		// region cas crediter
		// OK
		crediter(banque, momo.numero(), 500);
		// Erreur SoldeInsuffisantException
		crediter(banque, momo.numero(), 1_000_000);
		// endregion cas crediter
	}

	private static void debiter(GestionnaireBanque banque, String numeroCompte, double montant)
	{
		try {
			ResultatOperation resultatOperation = banque.debiter(numeroCompte, montant);
		} catch (
			CompteIntrouvableException |
			SoldeInsuffisantException |
			MontantInvalideException e
		) {
			System.out.println("Erreur lors du débitage : " + e.getMessage());
		}
	}

	private static void crediter(GestionnaireBanque banque, String numeroCompte, double montant)
	{
		try {
			ResultatOperation resultatOperation = banque.crediter(numeroCompte, montant);
		} catch (
			CompteIntrouvableException |
			SoldeInsuffisantException |
			MontantInvalideException e
		) {
			System.out.println("Erreur lors du créditage : " + e.getMessage());
		}
	}
}
