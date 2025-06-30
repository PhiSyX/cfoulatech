package exo.basics.klass.polymorphisms;

public class PolymorphismTest
{
	private final Animal[] animals = {
		new Duck("Daffy Duck"),
		new Nightingale("Woody woodpecker")
	};

	private final Flying[] flyings = {
		new Duck("Anil"),
	};

	public static void main(String[] args)
	{
		PolymorphismTest poly = new PolymorphismTest();

		for (Animal animal : poly.animals) {
			animal.makeNoise();
		}

		for (Flying flying : poly.flyings) {
			flying.fly();
		}

		Animal donald = new Duck("Donald");

		if (donald instanceof Swim) {
			Swim donaldSwim = (Swim) donald;
			donaldSwim.swim();
		}
	}
}
