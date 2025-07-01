package exo.primitive_types;

public class Cast
{
	public static void main(String[] args)
	{
		byte small = 10;
		int medium = 1_000;
		long big = 50_000L;
		float decimal = 3.14F;
		double preciseDecimal = 2.718281828;

		int result1 = small;
		long result2 = medium;
		double result3 = decimal;

		int result4 = (int) big;
		float result5 = (float) preciseDecimal;
		byte result6 = (byte) medium;

		int result7 = (int) decimal;
		byte result8 = (byte) decimal;

		System.out.println("1. byte → int: " + result1);
		System.out.println("2. int → long: " + result2);
		System.out.println("3. float → double: " + result3);
		System.out.println("4. long → int: " + result4 + " (attention au débordement!)");
		System.out.println("5. double → float: " + result5);
		System.out.println("6. int → byte: " + result6);
		System.out.println("7. float → int: " + result7 + " (partie décimale perdue!)");
		System.out.println("8. float → byte: " + result8);
	}
}
