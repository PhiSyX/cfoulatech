package exo.restaurant.entity;

import exo.restaurant.enums.TypePlat;
import exo.restaurant.exceptions.PrixInvalideException;

public class Plat
{
	private String nom;
	private double prix;
	private TypePlat type;

	public Plat(String nom, double prix, TypePlat type)
	{
		if (prix <= 0.0) {
			throw new PrixInvalideException("Le prix est négatif");
		}

		this.nom = nom;
		this.prix = prix;
		this.type = type;
	}

	public String getNom()
	{
		return nom;
	}

	public void setNom(String nom)
	{
		this.nom = nom;
	}

	public double getPrix()
	{
		return prix;
	}

	public void setPrix(double prix)
	{
		this.prix = prix;
	}

	public TypePlat getType()
	{
		return type;
	}

	public void setType(TypePlat type)
	{
		this.type = type;
	}

	@Override
	public String toString()
	{
		return "Plat{" +
			"nom='" + nom + '\'' +
			", prix=" + prix +
			", type=" + type +
			'}';
	}
}
