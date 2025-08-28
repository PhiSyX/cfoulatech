package be.cfoulatech;

import be.cfoulatech.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public class Main
{
	/*
	public static void main(String[] args)
	{
		String url = "jdbc:postgresql://localhost:5432/java_courses";
		String username = "postgres";
		String password = "WebA2025";

		try (
			Connection connection = DriverManager.getConnection(url, username, password)
		) {
			System.out.println("✅ Connexion réussie avec Maven !");
		} catch (SQLException e) {
			System.out.println("❌ Erreur : " + e.getMessage());
		}
	}
	 */

	public static void main(String[] args)
	{
		try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("java-courses")) {
			EntityManager em = emf.createEntityManager();

//			addUsers(em);
//			listUsers(em);
			findUser(em);
		} catch (Exception e) {
			System.out.printf("Erreur SQL: %s%n", e.getMessage());
		}
	}

	private static void addUsers(EntityManager em)
	{
		em.getTransaction().begin();

		User alice = new User("Alice", "alice@email.com", LocalDate.of(1995, 6, 15));
		User bob = new User("Bob", "bob@email.com", LocalDate.of(1988, 12, 3));

		em.persist(alice);
		em.persist(bob);

		em.getTransaction().commit();
	}

	private static void listUsers(EntityManager em)
	{
		List<User> users = em.createQuery(
				"SELECT u FROM User u",
				User.class
			)
			.getResultList();

		for (User user : users) {
			System.out.println(user.getName());
		}
	}

	private static void findUser(EntityManager em)
	{
		User firstUser = em.find(User.class, 1);
		System.out.println(firstUser.getEmail());
	}
}
