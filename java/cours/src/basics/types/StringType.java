package basics.types;

public class StringType {
	public static void main(String[] args)
	{
		String firstname = "Mike";

		System.out.println(firstname);
		System.out.println("La taille de la chaîne est de : " + firstname.length());

		String lastname = "S.";
		String nickname = "PhiSyX";

		StringBuilder strb = new StringBuilder()
			.append(firstname)
			.append(" '")
			.append(nickname)
			.append("' ")
			.append(lastname)
		;

		System.out.println(strb.toString());

		String fullname = String.format("%s '%s' %s", firstname, nickname, lastname);
		System.out.println(fullname);
	}
}
