package exo.basics;

public class MySecondClass
{
	public static void main(String[] args)
	{
		// Information sur le JDK utilisé
		System.out.println("=== Information sur l'environnement Java ===");
		System.out.println("Java version: " + System.getProperty("java.version"));
		System.out.println("Fournisseur JDK: " + System.getProperty("java.vendor"));
		System.out.println("Répertoire d'installation Java: " + System.getProperty("java.home"));

		// Information sur le système
		System.out.println();
		System.out.println("=== Information sur le système ===");
		System.out.println("Système d'exploitation: " + System.getProperty("os.name"));
		System.out.println("Nom d'utilisateur: " + System.getProperty("user.name"));
	}
}
