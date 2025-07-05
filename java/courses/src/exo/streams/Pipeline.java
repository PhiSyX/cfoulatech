package exo.streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Pipeline
{
	public static void main(String[] args)
	{
		PipelineNumber.main(args);
		divider();
		PipelineString.main(args);
		divider();
	}

	private static void divider()
	{
		System.out.println("-".repeat(20));
	}
}

class PipelineNumber
{
	public static void main(String[] args)
	{
		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

		List<Integer> pairsNumber = numbers.stream().filter(n -> n % 2 == 0).map(n -> n * 2).toList();

		System.out.println(pairsNumber);
	}
}

class PipelineString
{
	public static void main(String[] args)
	{
//		toUpper();
//		filtered();
		price();
	}

	private static void price()
	{
		List<Double> prices = Arrays.asList(19.99, 5.50, 12.30, 25.00, 8.75, 30.25);

		Double total = prices.stream().filter(n -> n >= 10.0 && n <= 25.0).map(n -> n - ((10 * n) / 100) * .9).sorted()
			.reduce(0.0, Double::sum);

		System.out.println(total);
	}

	private static void toUpper()
	{
		List<String> names = Arrays.asList("Mike", "Erica", "Carina", "Clovis", "Olga");

		List<String> namesUpper = names.stream().filter(n -> n.startsWith("C")).map(n -> n.toUpperCase()).sorted().toList();

		System.out.println(namesUpper);
	}

	private static void filtered()
	{
		List<String> names = Arrays.asList("Mike", "Erica", "Carina", "Clovis", "Olga");
		Stream<String> namesStream = names.stream();

//		System.out.println(namesStream.filter(n -> n.length() > 5).count());
//		System.out.println(namesStream.filter(n -> n.startsWith("E")).findFirst().get());
//		namesStream.forEach(n -> System.out.println(n.toUpperCase()));
	}
}
