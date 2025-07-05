package exo.klass.inherits;

public class Dog extends Animal
{
	private String breed;

	public Dog(String name, int age, String breed)
	{
		super(name, age);
		this.breed = breed;
	}

	public void bark()
	{
		System.out.printf("%s aboie : Woof%n", name);
	}

	@Override
	public void eat()
	{
		System.out.printf("%s mange des croquettes.%n", name);
	}
}

class DogTest
{
	public static void main(String[] args)
	{
		Dog laika = new Dog("Laika", 10, "Husky");
		laika.bark();
		laika.eat();
		laika.sleep();
	}
}
