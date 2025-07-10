package exo.annotations;

import exo.annotations.validation.Auteur;
import exo.annotations.validation.Configuration;
import exo.annotations.validation.Important;
import exo.annotations.validation.Todo;

@Auteur(nom = "Alice", email = "alice@dev.com")
public class Utilisateur
{
	@Important
	private String nom;

	@Configuration(valeur = "email-unique")
	private String email;

	//	@Todo // erreur (method seulement)
	private String motDePasse;

	@Configuration(valeur = "age-positif", description = "l'âge doit être positif")
	private int age;

	public Utilisateur(String nom, String email, String motDePasse, int age)
	{
		this.nom = nom;
		this.email = email;
		this.motDePasse = motDePasse;
		this.age = age;
	}

	public String getNom()
	{
		return nom;
	}

	public String getEmail()
	{
		return email;
	}

	public String getMotDePasse()
	{
		return motDePasse;
	}

	public int getAge()
	{
		return age;
	}

	@Todo
	public void validerMotDePasse()
	{
		System.out.println("TODO: Implémenter le changement de mot de passe");
	}

	@Todo
	public void changerEmail(String nouveauEmail)
	{
		System.out.println("TODO: Implémenter le changement de mail");
	}
}
