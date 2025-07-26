import java.time.LocalDate;

public class Bird extends Animal
{
	private String color;
	private Boolean aviary;

	public Bird(String name, Double weight, Double size, String sex, Integer age, Integer humanAge, LocalDate arrivalDate, String color, Boolean aviary)
	{
		super(name, weight, size, sex, age, humanAge, arrivalDate);
		this.color = color;
		this.aviary = aviary;
	}

	@Override
	public void shout()
	{
		System.out.println(name + " : Cui-cui !");
	}

	@Override
	public Double getProbabilityOfDeath()
	{
		return 0.03;
	}

	@Override
	public String toString()
	{
		return super.toString() + String.format(", Couleur: %s, Volière: %s", color, aviary ? "Oui" : "Non");
	}
}
