import java.time.LocalDate;

public class Dog extends Animal
{
	private String colorNecklace; // couleur du collier
	private Boolean trained; // dressé
	private String breed; // race

	public Dog(String name, Double weight, Double size, String sex, Integer age, Integer humanAge, LocalDate arrivalDate, String colorNecklace, Boolean trained, String breed)
	{
		super(name, weight, size, sex, age, humanAge, arrivalDate);
		this.colorNecklace = colorNecklace;
		this.trained = trained;
		this.breed = breed;
	}

	@Override
	public void shout()
	{
		System.out.println(name + " : Wouf !");
	}

	@Override
	public Double getProbabilityOfDeath()
	{
		return 0.01;
	}

	@Override
	public String toString()
	{
		return super.toString() + String.format(", Collier: %s, Dressé: %s, Race: %s", colorNecklace, trained ? "Oui" : "Non", breed);
	}
}
