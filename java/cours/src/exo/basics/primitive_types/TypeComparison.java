package exo.basics.primitive_types;

public class TypeComparison
{
	public static void main(String[] args)
	{
		int nombre1 = 100;
		int nombre2 = nombre1;
		nombre1 = 200;

		System.out.println("nombre1: " + nombre1);
		System.out.println("nombre2: " + nombre2);

		String texte1 = "Hello";
		String texte2 = texte1;
		texte1 = texte1 + " World"; // On verra ça dans l'immutabilité

		System.out.println("texte1: " + texte1);
		System.out.println("texte2: " + texte2);
		System.out.println("Même objet ? " + (texte1 == texte2));
	}
}
