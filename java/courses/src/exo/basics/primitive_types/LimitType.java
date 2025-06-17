package exo.basics.primitive_types;

public class LimitType
{
	public static void main(String[] args)
	{
		// Test 1 : Que se passe-t-il si on dépasse un byte ?
		byte small = 127;
		System.out.println("Byte max: " + small);
		small += 1;
		System.out.println("Byte min: " + small);

		// Test 2 : Précision des float vs double
		float precisionFloat = 1.123456789F;
		double precisionDouble = 1.123456789;
		System.out.println("Float: " + precisionFloat);
		System.out.println("Double: " + precisionDouble);
		// Que remarquez-vous sur la précision ?

		// Test 3 : Les char's sont des nombres !
		char letter = 'A';
		int cp = (int) letter;
		System.out.println("Lettre: " + letter);
		System.out.println("Code ASCII: " + cp);
		// TODO: Que donne (char)66 ?
		System.out.println((char) 66);

		// Rétrécissement, potentiellement dangereux
		double price = 299.99;
		int price_int = (int) price; // Cast explicite requis
		System.out.println(price_int); // 299 (partie décimale perdue !)
		// Attention aux débordements !
		long big = 3000000000L;
		int small2 = (int) big; // ⚠️ Débordement possible !
		System.out.println(small2);
	}
}
