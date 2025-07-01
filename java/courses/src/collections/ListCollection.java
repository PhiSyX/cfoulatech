package collections;

import java.util.ArrayList;
import java.util.List;

public class ListCollection
{
	public static void main(String[] args)
	{
		arrayList();
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}

	private static void arrayList()
	{
		List names1 = new ArrayList();
		names1.add("Carina");
		names1.add("Erica");
		String name1 = (String) names1.get(0);
		String name2 = (String) names1.get(1);
		System.out.println(name1);
		System.out.println(name2);

		divider();

		List<String> names2 = new ArrayList<>();
		names2.add("Olga");
		names2.add("Mike");

		var name3 = names2.get(0);
		var name4 = names2.get(1);
		System.out.println(name3);
		System.out.println(name4);
		names2.add(1, "Clovis");
		var name5 = names2.get(1);
		var name6 = names2.get(2);
		System.out.println(name5);
		System.out.println(name6);

		divider();

		for (int i = 0; i < names2.size(); i++) {
			String nameX = (String) names2.get(i);
			System.out.println(nameX);
		}
	}
}
