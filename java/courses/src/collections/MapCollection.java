package collections;

import java.util.HashMap;
import java.util.Map;

public class MapCollection
{
	public static void main(String[] args)
	{
		hashMap();
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}

	private static void hashMap()
	{
		Map capitals = new HashMap();
		capitals.put("Italie", "Rome");
		capitals.put("Belgique", "Bruxelles");
		capitals.put("France", "Paris");

		String capitalFrance = (String) capitals.get("France");
		System.out.println(capitalFrance);

		Map<String, Integer> ages = new HashMap<>();
		ages.put("Erica", 21);
		ages.put("Carina", 24);
		ages.put("Olga", 27);
		Integer ageCarina = ages.get("Carina");
		System.out.println(ageCarina);

		boolean isContains1 = ages.containsKey("Erica");
		boolean isContains2 = ages.containsKey("Clovis");
		System.out.println(isContains1);
		System.out.println(isContains2);

		for (Object obj : ages.keySet()) {
			String key = (String) obj;
			Integer val = (Integer) ages.get(key);

			System.out.println(key);
			System.out.println(val);
		}
	}
}
