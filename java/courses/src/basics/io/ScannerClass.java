package basics.io;

import java.util.Scanner;

public class ScannerClass
{
	public static void main(String[] args)
	{
		Scanner in = new Scanner(System.in);

		System.out.println("=== INSCRIPTION CFOULATECH ===");

		System.out.print("Votre âge : ");
		int age = Integer.parseInt(
			in.nextLine()
				.replaceAll("([a-zA-Z]+.*)", "")
		);

		System.out.print("Votre nom complet : ");
		String nom = in.nextLine();

		System.out.print("Votre ville : ");
		String ville = in.nextLine();

		System.out.println("\n=== CONFIRMATION ===");
		System.out.println("Nom : " + nom);
		System.out.println("Âge : " + age + " ans");
		System.out.println("Ville : " + ville);
		System.out.println("Bienvenue à Cfoulatech !");
	}
}
