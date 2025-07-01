package klass;

public class StaticClass
{
	public static void main(String[] args)
	{
		sayHello();
		sayGoodbye();
	}

	public static void sayHello()
	{
		System.out.println("Hello");
	}

	private static void sayGoodbye()
	{
		System.out.println("Goodbye");
	}
}
