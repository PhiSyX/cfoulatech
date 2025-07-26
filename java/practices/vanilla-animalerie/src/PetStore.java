// Animalerie.java

import java.util.ArrayList;
import java.util.List;

public class PetStore
{
	private final List<Animal> animals = new ArrayList<>();

	public void add(Animal a)
	{
		animals.add(a);
	}

	public void list()
	{
		if (animals.isEmpty()) {
			System.out.println("Aucun animal enregistré.");
			return;
		}

		for (Animal animal : animals) {
			System.out.println(animal);
		}
	}

	public void count()
	{
		Long cats = animals.stream().filter(a -> a instanceof Cat).count();
		Long dogs = animals.stream().filter(a -> a instanceof Dog).count();
		Long birds = animals.stream().filter(a -> a instanceof Bird).count();

		System.out.printf("Chats: %d, Chiens: %d, Oiseaux: %d%n", cats, dogs, birds);
	}

	public void checkDeathNight()
	{
		for (Animal animal : animals) {
			if (animal.isAlive()) {
				animal.checkDeath();
			}
		}

		System.out.println("Vérification des décès effectuée.");
	}
}
