package primitive_types;

public class BooleanType
{
	public static void main(String[] args)
	{
		System.out.println("Boolean True: " + Boolean.TRUE + ", False: " + Boolean.FALSE);
		System.out.println("Boolean True: " + true + ", False: " + false);

		byte majority = 18;
		byte personAge = 24;
		boolean isAdult = personAge >= majority;
		System.out.println(isAdult);
	}
}
