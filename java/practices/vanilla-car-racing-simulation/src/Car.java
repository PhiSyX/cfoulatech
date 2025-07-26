public class Car
{
	private final String brand;
	private final String model;
	private final double minSpeed; // km/h
	private final double maxSpeed; // km/h
	private double totalTime; // seconds

	public Car(String brand, String model, double minSpeed, double maxSpeed)
	{
		this.brand = brand;
		this.model = model;
		this.minSpeed = minSpeed;
		this.maxSpeed = maxSpeed;
		this.totalTime = 0.0;
	}

	public String getBrand()
	{
		return brand;
	}

	public String getModel()
	{
		return model;
	}

	public double getTotalTime()
	{
		return totalTime;
	}

	public double driveLap(double lapDistanceKm)
	{
		double speed = minSpeed + Math.random() * (maxSpeed - minSpeed); // random speed between min and max
		double timeHours = lapDistanceKm / speed;
		double timeSeconds = timeHours * 3600;
		totalTime += timeSeconds;
		return timeSeconds;
	}
}
