package exo.klass.abstracts;

public class Bike extends Vehicle
{
	public Bike(String brand, int speedMax)
	{
		super(brand, speedMax);
	}

	@Override
	public void start()
	{
		System.out.printf("Le %s démarre à la force des jambes%n", getBrand());
	}
}
