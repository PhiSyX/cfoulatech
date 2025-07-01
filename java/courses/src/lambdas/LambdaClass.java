package lambdas;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class LambdaClass
{
	public static void main(String[] args)
	{
		List<String> names = new ArrayList<>();
		names.add("Erica");
		names.add("Carina");
		names.add("Olga");

		for (String name : names) {
			System.out.println(name);
		}

		Collections.sort(names, new Comparator<String>()
		{
			@Override
			public int compare(String o1, String o2)
			{
				return o1.compareTo(o2);
			}
		});

		for (String name : names) {
			System.out.println(name);
		}

		divider();

		names.forEach(name -> System.out.println(name));
		names.sort((o1, o2) -> o1.compareTo(o2));

		divider();

		names.removeIf(name -> name.startsWith("O"));
		names.forEach(name -> System.out.println(name));
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}
}
