package exo.basics.klass;

public class AdvancedCalc
{
	public static void main(String[] args)
	{
		System.out.println(mul(5, 3));
		System.out.println(mul(5.5, 2.0));
		System.out.println(mul(2, 3, 4));

		display(42);
		display(Math.PI);
		display("Hello");
	}

	public static int mul(int l, int r)
	{
		return l * r;
	}

	public static double mul(double l, double r)
	{
		return l * r;
	}

	public static int mul(int a, int b, int c)
	{
		return a * b * c;
	}

	public static void display(int n)
	{
		System.out.println("Entier : " + n);
	}

	public static void display(double n)
	{
		System.out.println("Décimal : " + n);
	}

	public static void display(String t)
	{
		System.out.println("Texte : " + t);
	}
}
