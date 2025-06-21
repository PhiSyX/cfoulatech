package basics.io;

import java.util.Scanner;

public class ScannerClass
{
	public static void main(String[] args)
	{
		Scanner scanner = new Scanner(System.in);

		System.out.println("=== INSCRIPTION CFOULATECH ===");

		System.out.print("Votre âge : ");
		int age = Integer.parseInt(
			scanner.nextLine()
				.replaceAll("([^\\d]+.*)", "")
		);

		System.out.print("Votre nom complet : ");
		String fullName = scanner.nextLine();

		System.out.print("Votre ville : ");
		String city = scanner.nextLine();

		System.out.println("\n=== CONFIRMATION ===");
		System.out.println("Nom : " + fullName);
		System.out.println("Âge : " + age + " ans");
		System.out.println("Ville : " + city);
		System.out.println("Bienvenue à Cfoulatech !");
	}
}
