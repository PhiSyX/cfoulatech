package data_access.jdbc;

import java.sql.*;
import java.time.LocalDate;

public class ConnectionClass
{
	public static void main(String[] args)
	{
		String dbUrl = "jdbc:postgresql://localhost:5432/java_courses";

		String dbUser = "postgres";
		String dbPass = "WebA2025";

		try (Connection dbConn = DriverManager.getConnection(dbUrl, dbUser, dbPass)) {
			System.out.println("✅ Connexion réussie ! " + dbConn);
//			createUserTable(dbConn);
//			insertUsers(dbConn);
			showUsers(dbConn);
		} catch (SQLException e) {
			System.out.println("❌ Erreur : " + e.getMessage());
		}
	}

	private static void insertUsers(Connection dbConn) throws SQLException
	{
		String insertUserQuery = """
			INSERT INTO users (name, email, birthday) VALUES (?, ?, ?::date)
			""";

		PreparedStatement stmt = dbConn.prepareStatement(insertUserQuery);

		stmt.setString(1, "Alice");
		stmt.setString(2, "alice@paysdesmerveilles.com");
		stmt.setDate(3, Date.valueOf(LocalDate.of(1865, 12, 1)));
		stmt.executeUpdate();

		stmt.setString(1, "John");
		stmt.setString(2, "john@doe.be");
		stmt.setString(3, "1964-05-01");
		stmt.executeUpdate();

		stmt.setString(1, "Bob");    // Requête déjà compilée !
		stmt.setString(2, "bob@lebricoleur.fr");
		stmt.setDate(3, Date.valueOf(LocalDate.of(1999, 4, 12)));
		stmt.executeUpdate();

		stmt.setString(1, "Charlie"); // Encore plus rapide !
		stmt.setString(2, "charlie@etlachocolaterie.com");
		stmt.setDate(3, Date.valueOf(LocalDate.of(1964, 8, 7)));
		stmt.executeUpdate();
	}

	private static void showUsers(Connection connection) throws SQLException
	{
		String selectUserQuery = "SELECT * FROM users";

		try (
			Statement stmt = connection.createStatement();
			ResultSet record = stmt.executeQuery(selectUserQuery)
		) {
			System.out.println("📋 Liste des utilisateurs :");
			while (record.next()) {
				Integer idData = record.getInt("id");
				String nameData = record.getString("name");
				String emailData = record.getString("email");
				System.out.println(idData + " - " + nameData + " : " + emailData);
			}
		}
	}

	private static void createUserTable(Connection connection) throws SQLException
	{
		String createUserTableSQL = """
			CREATE TABLE IF NOT EXISTS users (
			    id SERIAL PRIMARY KEY,
			    name VARCHAR(100) NOT NULL,
			    email VARCHAR(150) UNIQUE NOT NULL,
			    birthday DATE
			)
			""";

		try (Statement statement = connection.createStatement()) {
			statement.execute(createUserTableSQL);
			System.out.println("✅ Table créée");
		}
	}
}
