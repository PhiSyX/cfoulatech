package primitive_types;

public class IntegerType
{
	public static void main(String[] args)
	{
		// 1 octet (byte) (8-bit signé)
		System.out.println("Byte MIN: " + Byte.MIN_VALUE + ", MAX: " + Byte.MAX_VALUE);
		byte personAge = 42;
		byte footSize = 38;
		System.out.println(personAge);
		System.out.println(footSize);
		System.out.println();

		// 2 octets (16-bit signé)
		System.out.println("Short MIN: " + Short.MIN_VALUE + ", MAX: " + Short.MAX_VALUE);
		short wineAge = 300;
		short yearProductionFortnight = 2017;
		System.out.println(wineAge);
		System.out.println(yearProductionFortnight);
		System.out.println();

		// 4 octets (32-bit signé)
		System.out.println("Integer MIN: " + Integer.MIN_VALUE + ", MAX: " + Integer.MAX_VALUE);
		int totalDogsBelgium = 1_6000_000;
		System.out.println(totalDogsBelgium);
		System.out.println();

		// 8 octets (64-bit signé)
		System.out.println("Long MIN: " + Long.MIN_VALUE + ", MAX: " + Long.MAX_VALUE);
		long totalHumans = 8_000_000_000L;
		System.out.println(totalHumans);
	}
}
