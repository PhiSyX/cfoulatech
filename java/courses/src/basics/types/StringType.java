package basics.types;

public class StringType
{
	public static void main(String[] args)
	{
		String firstname = "Mike";

		System.out.println(firstname);

		String lastname = "S.";
		String nickname = "PhiSyX";

		String name = "Erica";
		name += " Carina";
		System.out.println(name);

		StringBuilder strb = new StringBuilder()
			.append(firstname)
			.append(" '")
			.append(nickname)
			.append("' ")
			.append(lastname);

		System.out.println(strb.toString());

		String fullName = String.format("%s '%s' %s", firstname, nickname, lastname);
		System.out.println(fullName);

		System.out.println("La taille de la chaîne est de : " + firstname.length());
		System.out.println("La 1ère lettre de la chaîne est : " + firstname.charAt(0));
		System.out.println("La 3ème lettre de la chaine est : " + firstname.charAt(2));
		System.out.println("MAJ: " + firstname.toUpperCase());
		System.out.println("min: " + firstname.toLowerCase());
		System.out.println("Récupère une partie d'une chaine, entre 1 et 3: " + firstname.substring(1, 3));
		System.out.println(firstname.contains(""));
		System.out.println(firstname.startsWith("John"));
		System.out.println(firstname.endsWith("Doe"));
		System.out.println("   hello   ".trim());
	}
}
