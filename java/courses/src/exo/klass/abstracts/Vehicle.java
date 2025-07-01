package exo.basics.klass.abstracts;

public abstract class Vehicle
{
	private final String brand;

	private int speedMax;

	public Vehicle(String brand, int speedMax)
	{
		this.brand = brand;
		this.speedMax = speedMax;
	}

	public void displayInfo()
	{
		System.out.println(brand);
		System.out.println(speedMax);
	}

	public abstract void start();

	public String getBrand()
	{
		return brand;
	}

	public int getSpeedMax()
	{
		return speedMax;
	}

	public void setSpeedMax(int speedMax)
	{
		if (speedMax > 0) {
			this.speedMax = speedMax;
		}
	}
}

class VehicleTest
{
	public static void main(String[] args)
	{
//		Vehicle v = new Vehicle("panic", 42);

		Car audi = new Car("Audi", 180);
		Bike folded = new Bike("Folded", 25);

		audi.displayInfo();
		audi.start();

		folded.displayInfo();
		folded.start();

		folded.setSpeedMax(0);
		folded.displayInfo();
		folded.setSpeedMax(26);
		folded.displayInfo();
	}
}
