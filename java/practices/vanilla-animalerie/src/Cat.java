import java.time.LocalDate;

public class Cat extends Animal
{
	private final String character;
	private final Boolean cutClaws;
	private final Boolean longhair;

	public Cat(String name, Double weight, Double size, String sex, Integer age, Integer humanAge, LocalDate arrivalDate, String character, Boolean cutClaws, Boolean longhair)
	{
		super(name, weight, size, sex, age, humanAge, arrivalDate);
		this.character = character;
		this.cutClaws = cutClaws;
		this.longhair = longhair;
	}

	@Override
	public void shout()
	{
		System.out.println(name + " : Miaou !");
	}

	@Override
	public Double getProbabilityOfDeath()
	{
		return 0.005;
	}

	@Override
	public String toString()
	{
		return super.toString() + String.format(", Caractère: %s, Griffes coupées: %s, Poil long: %s", character, cutClaws ? "Oui" : "Non", longhair ? "Oui" : "Non");
	}
}
