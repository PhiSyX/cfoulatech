package exo.basics.klass.polymorphisms;

public class Duck extends Animal implements Flying, Swim
{
	public Duck(String name)
	{
		super(name);
	}

	@Override
	public void makeNoise()
	{
		System.out.printf("%s fait coin-coin%n", name);
	}

	@Override
	public void fly()
	{
		System.out.printf("%s vole au-dessus de l'eau%n", name);
	}

	@Override
	public void swim()
	{
		System.out.printf("%s nage tranquillement%n", name);
	}
}
