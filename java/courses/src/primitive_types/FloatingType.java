package primitive_types;

public class FloatingType
{
	public static void main(String[] args)
	{
		// 4 octets (32-bit fp)
		System.out.println("Float MIN: " + Float.MIN_VALUE + ", MAX: " + Float.MAX_VALUE);
		float a = 0.1F;
		float b = 0.2F;
		float c = a + b;
		System.out.println(c);
		System.out.println();

		// 8 octets (64-bit fp)
		System.out.println("Double MIN: " + Double.MIN_VALUE + ", MAX: " + Double.MAX_VALUE);
		double d = 0.1D;
		double e = 0.2;
		double f = d + e;
		System.out.println(f);
	}
}
