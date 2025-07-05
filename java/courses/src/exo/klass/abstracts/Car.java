package exo.klass.abstracts;

public class Car extends Vehicle
{
	public Car(String brand, int speedMax)
	{
		super(brand, speedMax);
	}

	@Override
	public void start()
	{
		System.out.printf("La %s démarre avec un moteur", getBrand());
	}
}
