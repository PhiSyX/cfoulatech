package basics.primitive_types;

public class CharacterType
{
	public static void main(String[] args)
	{
		char anyLetter = 'S';
		System.out.println(anyLetter);

		String firstname = "Mike";
		char firstLetter = firstname.charAt(0);
		System.out.println(firstLetter);

		try {
			char outOfBounds = firstname.charAt(99);
			System.out.println(outOfBounds);
		} catch (StringIndexOutOfBoundsException e) {
			System.err.println("Le message d'erreur est : " + e.getMessage());
		}
	}
}
