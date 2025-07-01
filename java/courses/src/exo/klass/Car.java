package exo.klass;

public class Car
{
	private String brand;
	private String color;
	private int currentSpeed = 0;
	private boolean isEngineOn = false;
	private Engine engine;

	public Car(String brand, String color, Engine engine)
	{
		this.brand = brand;
		this.color = color;
		this.engine = engine;
	}

	public String getBrand()
	{
		return brand;
	}

	public void setBrand(String brand)
	{
		this.brand = brand;
	}

	public String getColor()
	{
		return color;
	}

	public void setColor(String color)
	{
		this.color = color;
	}

	public int getCurrentSpeed()
	{
		return currentSpeed;
	}

	public void setCurrentSpeed(int currentSpeed)
	{
		if (currentSpeed >= 0) {
			this.currentSpeed = currentSpeed;
		}
	}

	public boolean isEngineOn()
	{
		return isEngineOn;
	}

	public void setEngineOn(boolean engineOn)
	{
		isEngineOn = engineOn;
	}

	public Engine getEngine()
	{
		return engine;
	}

	public void run()
	{
		if (isEngineOn()) {
			System.out.println("Le moteur est déjà allumé !");
			return;
		}

		setEngineOn(true);
		engine.run();
	}

	public void stop()
	{
		if (!isEngineOn()) {
			System.out.println("Le moteur est déjà éteint !");
			return;
		}

		setEngineOn(false);
		setCurrentSpeed(0);

		engine.stop();
	}

	public void accelerate() throws Exception
	{
		if (!isEngineOn()) {
			throw new Exception("Impossible d'accélérer, le moteur est éteint");
		}

		setCurrentSpeed(currentSpeed + 10);
		System.out.printf("Vitesse : %d km/h%n", getCurrentSpeed());
	}

	public void brake() throws IllegalArgumentException
	{
		if (!isEngineOn()) {
			throw new IllegalArgumentException();
		}

		setCurrentSpeed(getCurrentSpeed() - 5);

		System.out.printf("Vitesse : %d km/h%n", getCurrentSpeed());
	}

	public void displayPerf()
	{
		System.out.printf("Voiture %s avec %s%n", getBrand(), getEngine());

		if (engine.isPowerful()) {
			System.out.println("C'est une voiture puissante !");
		}
	}


	public void newEngine(Engine engine)
	{
		if (isEngineOn()) {
			System.out.println("Impossible de changer le moteur, voiture en marche");
			return;
		}

		this.engine = engine;
	}

	@Override
	public String toString()
	{
		return "Voiture{" +
			"brand='" + brand + '\'' +
			", color='" + color + '\'' +
			", currentSpeed=" + currentSpeed +
			", isEngineOn=" + isEngineOn +
			'}';
	}
}

class CarEngineTest
{
	public static void main(String[] args)
	{
		Engine diesel90 = new Engine(90, "diesel");
		Engine essence200 = new Engine(200, "essence");

		Car golf2 = new Car("Golf2", "Grise", diesel90);
		Car audiA3 = new Car("Audi A3", "Blanche", essence200);

		golf2.run();
		golf2.displayPerf();
		golf2.stop();

		audiA3.run();
		audiA3.displayPerf();
		audiA3.stop();

		audiA3.run();
		audiA3.run();

		golf2.newEngine(essence200);
		audiA3.newEngine(diesel90);
		audiA3.stop();
		audiA3.newEngine(diesel90);
	}
}
