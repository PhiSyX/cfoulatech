package collections;

import java.util.HashSet;
import java.util.Set;

public class SetCollection
{
	public static void main(String[] args)
	{
		hashSet();
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}

	private static void hashSet()
	{
		Set hset = new HashSet();
		hset.add("Mike");
		hset.add("Erica");
		hset.add("Carina");
		hset.add("Erica");
		System.out.println(hset);

		hset.add("Clovis");
		System.out.println(hset);

		/**/

		Set<String> fruits = new HashSet<>();
		boolean state1 = fruits.add("Pomme");
		boolean state2 = fruits.add("Banane");
		boolean state3 = fruits.add("Pêche");

		System.out.println(state1);
		System.out.println(state2);
		System.out.println(state3);
		boolean state4 = fruits.add("Banane");
		System.out.println(state4);

		fruits.remove("Banane");
		System.out.println(fruits);

		fruits.clear();
		System.out.println(fruits);
	}
}
