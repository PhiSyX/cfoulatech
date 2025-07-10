package exo.restaurant.entity;

import exo.restaurant.enums.StatusCommande;
import exo.restaurant.exceptions.CommandeImpossibleException;
import exo.restaurant.exceptions.QuantiteInvalideException;

import java.util.ArrayList;
import java.util.List;

public class Commande
{
	private int numero;
	private List<Plat> plats;
	private StatusCommande status;

	public Commande(int numero)
	{
		this.numero = numero;
		this.plats = new ArrayList<>();
		this.status = StatusCommande.EN_ATTENTE;
	}

	public int getNumero()
	{
		return numero;
	}

	public List<Plat> getPlats()
	{
		return plats;
	}

	public StatusCommande getStatus()
	{
		return status;
	}

	public void ajouterPlat(Plat plat, int quantite)
	{
		if (quantite <= 0) {
			throw new QuantiteInvalideException("La quantité est vide");
		}

		for (int i = 0; i < quantite; i++) {
			plats.add(plat);
		}
	}

	public void changerStatus(StatusCommande nouveauStatus)
	{
		if (status == StatusCommande.ANNULEE) {
			throw new CommandeImpossibleException("La commande est annulée");
		}

		status = nouveauStatus;
	}

	public double calculerTotal()
	{
		return plats.stream()
			.map(Plat::getPrix)
			.reduce(0.0, Double::sum);
	}
}
