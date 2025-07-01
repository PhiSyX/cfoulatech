package streams;

import java.util.ArrayList;
import java.util.List;

public class StreamClass
{
	public static void main(String[] args)
	{
		List<String> names = new ArrayList<>();

		names.add("Mike");
		names.add("Erica");
		names.add("Carina");
		names.add("Olga");
		names.add("Clovis");
		names.add("Aicha");
		names.add("Maxime");
		names.add("Timothy");
		names.add("Julien");


		List<String> result = names.stream()
			.filter(name -> name.contains("i"))
			.map(name -> name.toUpperCase())
			.sorted()
			.toList();

		for (String name : result)
		{
			System.out.println(name);
		}

		System.out.println(result.stream().count());
	}
}
