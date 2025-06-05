package basics.primitive_types;

public class FloatingType
{
	public static void main(String[] args)
	{
		System.out.println("Float MIN: " + Float.MIN_VALUE + ", MAX: " + Float.MAX_VALUE);
		System.out.println();
		System.out.println("Double MIN: " + Double.MIN_VALUE + ", MAX: " + Double.MAX_VALUE);

		float a = 0.1F;
		float b = 0.2F;
		float c = a + b;
		System.out.println(c);

		double d = 0.1D;
		double e = 0.2;
		double f = d + e;
		System.out.println(f);
	}
}
