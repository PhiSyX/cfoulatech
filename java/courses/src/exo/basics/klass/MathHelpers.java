package exo.basics.klass;

public class MathHelpers
{
	public static void main(String[] args)
	{
		System.out.println(avg(10, 15));

		for (int i = 0; i < 10; i++) {
			System.out.printf("%d est pair ?: %b%n", i, isPair(i));
		}

		System.out.println(createMessage("Mike", 24));

		displayMulTable(3);
	}

	public static double avg(int l, int r)
	{
		return (l + r) / 2.0;
	}

	public static boolean isPair(int n)
	{
		return n % 2 == 0;
	}

	private static String createMessage(String name, int age)
	{
		return String.format("Bonjour %s, vous avez %d ans !", name, age);
	}

	private static void displayMulTable(int n)
	{
		for (int i = 1; i <= 10; i++) {
			System.out.printf("%d x %d = %d%n", n, i, n * i);
		}
	}
}
