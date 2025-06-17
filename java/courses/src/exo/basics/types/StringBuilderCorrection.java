package exo.basics.types;

public class StringBuilderCorrection
{
	public static void main(String[] args)
	{
		String originalText = "Java Best in the WHOLE WORLD ! error";
		StringBuilder text = new StringBuilder(64).append(originalText);
		System.out.println("Texte original: " + text);
		System.out.println("Capacité initiale: " + text.capacity());

		String searchString = " error";
		int locatedString = originalText.indexOf(searchString);
		int endPosToOperate = locatedString + searchString.length();
		text.delete(locatedString, endPosToOperate);

		System.out.println("Après suppression error: " + text);

		searchString = "WHOLE WORLD";
		locatedString = originalText.indexOf(searchString);
		endPosToOperate = locatedString + searchString.length();
		String replaceString = searchString.toLowerCase();
		text.replace(locatedString, endPosToOperate, replaceString);

		System.out.println("Après passage en minuscules: " + text);

		searchString = "Best ";
		locatedString = originalText.indexOf(searchString) + searchString.length();
		replaceString = "language ";
		text.insert(locatedString, replaceString);

		System.out.println("Après ajout de 'language': " + text);

		String texteFinal = text.toString();
		System.out.println("Texte final: " + texteFinal);

		System.out.println("Longueur finale: " + text.length() + " caractères");
		System.out.println("Capacité finale: " + text.capacity() + " caractères");
	}
}
