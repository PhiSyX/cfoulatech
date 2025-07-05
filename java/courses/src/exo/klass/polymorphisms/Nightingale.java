package exo.klass.polymorphisms;

public class Nightingale extends Animal implements Flying
{
	public Nightingale(String name)
	{
		super(name);
	}

	@Override
	public void makeNoise()
	{
		System.out.printf("%s chante%n", name);
	}

	@Override
	public void fly()
	{
		System.out.printf("%s vole dans le ciel%n", name);
	}
}
