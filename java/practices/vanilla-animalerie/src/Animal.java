import java.time.LocalDate;

public abstract class Animal
{
	protected String name;
	protected Double weight;
	protected Double size;
	protected String sex;
	protected Integer age;
	protected Integer humanAge;
	protected LocalDate arrivalDate;
	protected Boolean alive = Boolean.TRUE;

	public Animal(String name, Double weight, Double size, String sex, Integer age, Integer humanAge, LocalDate arrivalDate)
	{
		this.name = name;
		this.weight = weight;
		this.size = size;
		this.sex = sex;
		this.age = age;
		this.humanAge = humanAge;
		this.arrivalDate = arrivalDate;
	}

	public abstract void shout();

	public abstract Double getProbabilityOfDeath();

	public Boolean isAlive()
	{
		return alive;
	}

	public void checkDeath()
	{
		Double prob = getProbabilityOfDeath();
		if (Math.random() < prob) {
			alive = Boolean.FALSE;
		}
	}

	public String getName()
	{
		return name;
	}

	public String toString()
	{
		return String.format("%s (%s) - Poids: %.2fkg, Taille: %.2fm, Sexe: %s, Âge: %d, Âge humain: %d, Arrivé: %s, Vivant: %s", name, this.getClass().getSimpleName(), weight, size, sex, age, humanAge, arrivalDate, alive ? "Oui" : "Non");
	}
}

record AnimalRecord(
	String name,
	Double weight,
	Double size,
	String sex,
	Integer age,
	Integer humanAge,
	LocalDate arrivalDate
)
{
}
