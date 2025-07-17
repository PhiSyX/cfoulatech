package be.cfoulatech;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main
{
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
}
