package exo.types;

public class StringEquality
{
	public static void main(String[] args)
	{
		String country1 = "Belgique";     // Méthode normale
		String country2 = "Belgique";     // Méthode normale
		String country3 = new String("Belgique");     // Avec new (force nouvel objet)

		System.out.println("country1 == country2: " + (country1 == country2));
		System.out.println("country1 == country3: " + (country1 == country3));

		System.out.println("country1.equals(country2): " + (country1.equals(country2)));
		System.out.println("country1.equals(country3): " + (country1.equals(country3)));

		String word = "cfoulatech";
		boolean containsTech = word.toLowerCase().contains("tech");
		System.out.println("Le mot contient 'tech': " + containsTech);

		String empty1 = "";
		String empty2 = new String();
		String empty3 = "     ";

		System.out.println("empty1 est vide: " + (empty1.length() == 0));
		System.out.println("empty2 est vide: " + empty2.isEmpty());

		System.out.println("empty3 n'est pas vide: " + empty3.isEmpty());
		System.out.println("empty3 est vide: " + empty3.isBlank());
	}
}
