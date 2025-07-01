package exo.klass;

public class Engine
{
	int horsepower;
	String type; // essence, diesel, électrique

	public Engine(int horsepower, String type)
	{
		this.horsepower = horsepower;
		this.type = type;
	}

	public int getHorsepower()
	{
		return horsepower;
	}

	public void setHorsepower(int horsepower)
	{
		this.horsepower = horsepower;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	public void run()
	{
		System.out.printf("Moteur %s de %d ch démarre%n", getType(), getHorsepower());
	}

	public void stop()
	{
		System.out.printf("Moteur %s de %d ch s'arrete", getType(), getHorsepower());
	}

	public boolean isPowerful()
	{
		return horsepower > 150;
	}

	@Override
	public String toString()
	{
		return "Engine{" +
			"horsepower=" + horsepower +
			", type='" + type + '\'' +
			'}';
	}
}
