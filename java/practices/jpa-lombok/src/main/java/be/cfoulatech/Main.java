package be.cfoulatech;

import be.cfoulatech.entities.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class Main
{
	public static void main(String[] args)
	{
		try (
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("java-courses");
			EntityManager em = emf.createEntityManager();
		) {
			try {
				em.getTransaction().begin();
//				creer(em);
//				lire(em);
				req(em);
				em.getTransaction().commit();
			} catch (Exception e) {
				if (em.getTransaction().isActive()) {
					em.getTransaction().rollback();
				}
				throw e;
			}
		} catch (Exception e) {
			System.out.printf("Erreur SQL: %s%n", e.getMessage());
		}
	}

	private static void creer(EntityManager em)
	{
		System.out.println("# Création des données");

		Adresse adresseParis = new Adresse("Rue Greneta", "42b", 75001, "Paris", "Studio");
		Adresse adresseLyon = new Adresse("Avenue Foch", "45", 69001, "Lyon", "Domicile");
		em.persist(adresseParis);
		em.persist(adresseLyon);

		Client john = new Client("John Doe", "john@doe.org", LocalDate.now(), adresseParis);
		Client jane = new Client("Jane Doe", "jane@doe.org", LocalDate.now(), adresseLyon);
		em.persist(john);
		em.persist(jane);

		Profil profilJohn = new Profil("public/avatar/john01.jpg", "Développeur passionné", "Livraison rapide", john);
		Profil profilJane = new Profil("Aime les bonnes affaires", jane);
		em.persist(profilJohn);
		em.persist(profilJane);

		Categorie info = new Categorie("Informatique", "Matériel informatique");
		Categorie electro = new Categorie("Electroménager");
		em.persist(info);
		em.persist(electro);

		Produit laptop = new Produit("MacBook Pro", "Ordinateur portable Apple", 1999.99, 5);
		Produit souris = new Produit("Souris Logitech", 29.99, 20);
		Produit frigo = new Produit("Frigo Samsung", "Réfrigérateur 400L", 899.99, 3);
		em.persist(laptop);
		em.persist(souris);
		em.persist(frigo);

		ProduitCategorie pc1 = new ProduitCategorie(laptop, info);
		ProduitCategorie pc2 = new ProduitCategorie(souris, info);
		ProduitCategorie pc3 = new ProduitCategorie(frigo, electro);
		em.persist(pc1);
		em.persist(pc2);
		em.persist(pc3);

		Commande commandeJohn = new Commande(LocalDateTime.now(), 2029.99, StatutCommande.EN_PREPARATION, john);
		Commande commandeJane = new Commande(LocalDateTime.now(), 899.99, StatutCommande.LIVREE, jane);
		em.persist(commandeJohn);
		em.persist(commandeJane);

		CommandeProduit cp1 = new CommandeProduit(1, 1999.99, commandeJohn, laptop);
		CommandeProduit cp2 = new CommandeProduit(1, 29.99, commandeJohn, souris);
		CommandeProduit cp3 = new CommandeProduit(1, 899.99, commandeJane, frigo);
		em.persist(cp1);
		em.persist(cp2);
		em.persist(cp3);
	}


	private static void lire(EntityManager em)
	{
		System.out.println("# Lecture des entités");

		Client john = em.find(Client.class, 7);
		System.out.println("Client: " + john.getNom());
		System.out.println("Habite: " + john.getAdresse().getType());
		System.out.println();

		Profil profilJohn = em.find(Profil.class, 7);
		System.out.println("Bio: " + profilJohn.getBio());
		System.out.println("Appartient à: " + profilJohn.getClient().getNom());
		System.out.println();

		Commande commande = em.find(Commande.class, 5);
		System.out.println("Commande: " + commande.getMontantTotal() + "€");
		System.out.println("Client: " + commande.getClient().getNom());
		System.out.println("Statut: " + commande.getStatut());
		System.out.println();

		CommandeProduit cp = em.find(CommandeProduit.class, 4);
		System.out.println("Produit commandé: " + cp.getProduit().getNom());
		System.out.println("Quantité: " + cp.getQuantite());
		System.out.println();

		ProduitCategorie pc = em.find(ProduitCategorie.class, 10);
		System.out.println("Assoc: " + pc.getProduit().getNom() + " -> " + pc.getCategorie().getNom());
		System.out.println();
	}

	private static void req(EntityManager em)
	{
		System.out.println("# Test de requêtes");

		System.out.println("Clients et leurs villes:");
		List<Object[]> clientsVilles = em.createQuery(
				"SELECT c.nom, c.adresse.ville FROM Client c",
				Object[].class
			)
			.getResultList();

		for (Object[] row : clientsVilles) {
			System.out.println("  - " + row[0] + " habite " + row[1]);
		}

		System.out.println("Produits informatique:");
		List<Object[]> produitsInfo = em.createQuery(
				"SELECT p.nom, p.prix FROM ProduitCategorie pc JOIN pc.produit p JOIN pc.categorie c WHERE c.nom = 'Informatique'",
				Object[].class
			)
			.getResultList();

		for (Object[] row : produitsInfo) {
			System.out.println("  - " + row[0] + " (" + row[1] + "€)");
		}

		System.out.println("Commandes par statut:");
		List<Object[]> commandesStatut = em.createQuery(
				"SELECT c.statut, COUNT(c) FROM Commande c GROUP BY c.statut",
				Object[].class
			)
			.getResultList();

		for (Object[] row : commandesStatut) {
			System.out.println("  - " + row[0] + ": " + row[1] + " commande(s)");
		}

		Double ca = em.createQuery(
				"SELECT SUM(c.montantTotal) FROM Commande c",
				Double.class
			)
			.getSingleResult();
		System.out.println("Chiffre d'affaires total: " + ca + "€");

		System.out.println("Clients avec commandes:");
		List<Object[]> clientsCommandes = em.createQuery(
				"SELECT c.nom, COUNT(cmd) FROM Client c JOIN Commande cmd ON cmd.client = c GROUP BY c.nom",
				Object[].class
			)
			.getResultList();

		for (Object[] row : clientsCommandes) {
			System.out.println("  - " + row[0] + ": " + row[1] + " commande(s)");
		}
	}
}
