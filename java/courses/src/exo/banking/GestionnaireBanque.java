package exo.banking;

import exo.banking.exceptions.CompteIntrouvableException;
import exo.banking.exceptions.MontantInvalideException;
import exo.banking.exceptions.SoldeInsuffisantException;
import exo.banking.records.Compte;
import exo.banking.records.ResultatOperation;

import java.util.HashMap;
import java.util.Map;

public class GestionnaireBanque
{
	private final Map<String, Compte> comptes;

	GestionnaireBanque()
	{
		this.comptes = new HashMap<>();
	}

	public void ajouterCompte(Compte compte)
	{
		comptes.put(compte.numero(), compte);
	}

	public ResultatOperation debiter(String numeroCompte, double montant)
		throws CompteIntrouvableException, SoldeInsuffisantException, MontantInvalideException
	{
		if (montant <= 0.0) {
			throw new MontantInvalideException("Le montant est invalide");
		}

		if (!comptes.containsKey(numeroCompte)) {
			throw new CompteIntrouvableException("Le compte est introuvable");
		}

		Compte compte = comptes.get(numeroCompte);
		double diff = compte.solde() - montant;

		if (diff < 0) {
			throw new SoldeInsuffisantException("Le solde est insuffisant");
		}

		Compte nouveauCompte = new Compte(compte.numero(), compte.titulaire(), diff);
		comptes.replace(numeroCompte, nouveauCompte);
		return new ResultatOperation(true, "Le solde de votre crédit a bien été débité", diff);
	}

	public ResultatOperation crediter(String numeroCompte, double montant)
		throws CompteIntrouvableException, SoldeInsuffisantException, MontantInvalideException
	{
		if (montant <= 0.0) {
			throw new MontantInvalideException("Le montant est invalide");
		}

		if (!comptes.containsKey(numeroCompte)) {
			throw new CompteIntrouvableException("Le compte est introuvable");
		}

		Compte compte = comptes.get(numeroCompte);
		double result = compte.solde() + montant;

		Compte nouveauCompte = new Compte(compte.numero(), compte.titulaire(), result);

		comptes.replace(numeroCompte, nouveauCompte);

		return new ResultatOperation(true, "Le solde de votre crédit a bien été débité", result);
	}
}
