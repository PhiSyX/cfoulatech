package basics.primitive_types;

public class IntegerType
{
	public static void main(String[] args)
	{
		System.out.println("Byte MIN: " + Byte.MIN_VALUE + ", MAX: " + Byte.MAX_VALUE);
		byte personAge = 42;
		byte footSize = 38;
		System.out.println(personAge);
		System.out.println(footSize);
		System.out.println();

		System.out.println("Short MIN: " + Short.MIN_VALUE + ", MAX: " + Short.MAX_VALUE);
		short wineAge = 300;
		short yearProductionFortnight = 2017;
		System.out.println(wineAge);
		System.out.println(yearProductionFortnight);
		System.out.println();

		System.out.println("Integer MIN: " + Integer.MIN_VALUE + ", MAX: " + Integer.MAX_VALUE);
		int totalDogsBelgium = 1_6000_000;
		System.out.println(totalDogsBelgium);
		System.out.println();

		System.out.println("Long MIN: " + Long.MIN_VALUE + ", MAX: " + Long.MAX_VALUE);
		long totalHumans = 8_000_000_000L;
		System.out.println(totalHumans);
	}
}
