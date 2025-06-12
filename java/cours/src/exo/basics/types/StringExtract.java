package exo.basics.types;

public class StringExtract
{
	public static void main(String[] args)
	{
		String email = "supermail@cfoulatech.be";
		String adress = "Rue de Paris 42, 1000 Bruxelles";
		String fullname = "Mounia-El Khalil";

		int indexAt = email.indexOf('@');
		String user = email.substring(0, indexAt);
		System.out.println("Utilisateur: " + user);

		String domain = email.substring(indexAt + 1);
		System.out.println("Domaine: " + domain);

		boolean isBelgianTld = email.endsWith(".be");
		System.out.println("Email belge: " + isBelgianTld);

		int indexComma = adress.indexOf(",") - 2;
		String streetName = adress.substring(0, indexComma);
		System.out.println("Nom de rue: " + streetName);

		int indexSpace = fullname.indexOf(" ");
		String firstname = fullname.substring(0, indexSpace);
		System.out.println("Prénom: " + firstname);

		System.out.println("Longueur du nom: " + fullname
			.replaceAll("\\s", "")
			.length());

		String fullnameUC = fullname.toUpperCase();
		System.out.println("Nom en majuscules: " + fullnameUC);
	}
}
