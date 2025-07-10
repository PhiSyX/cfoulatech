package exceptions;

import java.util.Scanner;

public class TryWithResources
{
	public static void main(String[] args)
	{
//		old();
		modern();
	}

	private static void old()
	{
		Scanner scanner1 = new Scanner(System.in);
		try {
			System.out.print("(OLD) Entrer un mot: ");
			System.out.println(scanner1.nextLine());
		} catch (Exception e) {
			System.err.println(e.getMessage());
		} finally {
			scanner1.close(); // Obligation de fermer manuellement
		}
	}

	private static void modern()
	{
		// La classe doit implémenter l'interface Closeable
		// qui a une méthode .close() appelé automatiquement
		// après la fin de la portée du try.
		try (Scanner scanner2 = new Scanner(System.in)) {
			System.out.print("(NEW) Entrer un mot: ");
			System.out.println(scanner2.nextLine());
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}
