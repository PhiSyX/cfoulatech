package be.cfoulatech;

import be.cfoulatech.entity.Boat;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.List;
import java.util.Random;

public class Main
{
	public static void main(String[] args)
	{
		try (
			EntityManagerFactory emf = Persistence.createEntityManagerFactory("java-bateau");
			EntityManager em = emf.createEntityManager();
		) {
			em.getTransaction().begin();
			addBoat(em);
//			listBoats(em);
//			deleteBoat(em);
//			updateFirstBoat(em);
			em.getTransaction().commit();
		} catch (Exception e) {
			System.out.printf("Erreur SQL: %s%n", e.getMessage());
		}
	}

	private static void addBoat(EntityManager em)
	{
		Boat titanic  = new Boat("Titanic", 28.2, 53.3, "Paquebot");
		Boat balerine = new Boat("Balerine", 6.0, 6.2, "Baleinier");
		Boat cableur  = new Boat("Cableur", 120.0, 17.0, "Câblier");

		em.persist(titanic);
		em.persist(balerine);
		em.persist(cableur);
	}

	private static void listBoats(EntityManager em)
	{
		List<Boat> boats = em.createQuery(
			"SELECT b FROM Boat b",
			Boat.class
		)
			.getResultList();

		for (Boat boat : boats) {
			System.out.println(boat.getName());
		}
	}

	private static void deleteBoat(EntityManager em)
	{
		Random rand = new Random();

		List<Boat> boats = em.createQuery("SELECT b FROM Boat b", Boat.class).getResultList();
		Boat randomBoat = boats.get(rand.nextInt(boats.size()));
		deleteBoat(em, randomBoat.getId());
	}

	private static void deleteBoat(EntityManager em, Integer id)
	{
		em.remove( em.find(Boat.class, id) );
	}

	private static void updateFirstBoat(EntityManager em)
	{
		Boat firstBoat = em.createQuery(
				"SELECT b FROM Boat b",
				Boat.class
			)
			.setFirstResult(0)
			.setMaxResults(1)
			.getSingleResult();

		firstBoat.setName(firstBoat.getName() + " 2.0");

		System.out.println(firstBoat);
	}
}
