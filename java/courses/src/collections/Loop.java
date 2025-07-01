package collections;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Loop
{
	public static void main(String[] args)
	{
		arrayList();
		hashMap();
	}

	private static void hashMap()
	{
		Map<String, Integer> ages = new HashMap<>();
		ages.put("Erica", 21);
		ages.put("Carina", 24);

		for (var entry : ages.entrySet()) {
			String name = entry.getKey();
			Integer age = entry.getValue();
			System.out.println(name + ", " + age + " ans");
		}
	}

	private static void arrayList()
	{
		List<String> names = new ArrayList<>();
		names.add("Mike");
		names.add("Clovis");

		for (String name : names) {
			System.out.println(name);
		}
	}
}
