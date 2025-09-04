package be.cfoulatech;

import be.cfoulatech.entities.Adresse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Main
{
	public static void main(String[] args)
	{
		try (
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("java-courses");
			EntityManager em = emf.createEntityManager();
		) {
//			Adresse a1 = new Adresse(
////				String rue, String numero, Integer codePostal, String ville, String type
//			);
		} catch (Exception e) {
			System.out.printf("Erreur SQL: %s%n", e.getMessage());
		}
	}
}
