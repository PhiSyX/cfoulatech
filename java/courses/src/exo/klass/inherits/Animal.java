package exo.klass.inherits;

public class Animal
{
	protected String name;
	protected int age;

	public Animal(String name, int age)
	{
		this.name = name;
		this.age = age;
	}

	public void eat()
	{
		System.out.printf("%s mange.%n", name);
	}

	public void sleep()
	{
		System.out.printf("%s dort.%n", name);
	}
}
