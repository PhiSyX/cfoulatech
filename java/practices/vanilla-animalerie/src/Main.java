import java.time.LocalDate;
import java.util.Scanner;

public class Main
{
	public static void main(String[] args)
	{
		PetStore petStore = new PetStore();

		int choice;

		try (Scanner scanner = new Scanner(System.in);) {
			do {
				System.out.println("\n--- Menu Animalerie ---");
				System.out.println("1. Ajouter un chat");
				System.out.println("2. Ajouter un chien");
				System.out.println("3. Ajouter un oiseau");
				System.out.println("4. Lister tous les animaux");
				System.out.println("5. Compter chats/chiens/oiseaux");
				System.out.println("6. Vérifier décès durant la nuit");
				System.out.println("0. Quitter");
				System.out.print("Votre choix : ");
				choice = scanner.nextInt();
				scanner.nextLine();

				switch (choice) {
					case 1:
						petStore.add(createCat(scanner));
						break;
					case 2:
						petStore.add(createDog(scanner));
						break;
					case 3:
						petStore.add(createBird(scanner));
						break;
					case 4:
						petStore.list();
						break;
					case 5:
						petStore.count();
						break;
					case 6:
						petStore.checkDeathNight();
						break;
					case 0:
						System.out.println("Au revoir !");
						break;
					default:
						System.out.println("Choix invalide.");
				}
			} while (choice != 0);
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}

	private static Cat createCat(Scanner scanner)
	{
		AnimalRecord animalRecord = createAnimalRecord(scanner);
		System.out.print("Caractère : ");
		String character = scanner.nextLine();
		System.out.print("Griffes coupées (true/false) : ");
		boolean cutClaws = scanner.nextBoolean();
		System.out.print("Poil long (true/false) : ");
		boolean longhair = scanner.nextBoolean();
		scanner.nextLine();
		return new Cat(animalRecord.name(), animalRecord.weight(), animalRecord.size(), animalRecord.sex(), animalRecord.age(), animalRecord.humanAge(), animalRecord.arrivalDate(), character, cutClaws, longhair);
	}

	private static Dog createDog(Scanner scanner)
	{
		AnimalRecord animalRecord = createAnimalRecord(scanner);
		System.out.print("Couleur du collier : ");
		String colorNecklace = scanner.nextLine();
		System.out.print("Dressé (true/false) : ");
		boolean trained = scanner.nextBoolean();
		scanner.nextLine();
		System.out.print("Race : ");
		String breed = scanner.nextLine();
		return new Dog(animalRecord.name(), animalRecord.weight(), animalRecord.size(), animalRecord.sex(), animalRecord.age(), animalRecord.humanAge(), animalRecord.arrivalDate(), colorNecklace, trained, breed);
	}

	private static Bird createBird(Scanner scanner)
	{
		AnimalRecord animalRecord = createAnimalRecord(scanner);
		System.out.print("Couleur : ");
		String color = scanner.nextLine();
		System.out.print("Volière (true/false) : ");
		boolean aviary = scanner.nextBoolean();
		scanner.nextLine();
		return new Bird(animalRecord.name(), animalRecord.weight(), animalRecord.size(), animalRecord.sex(), animalRecord.age(), animalRecord.humanAge(), animalRecord.arrivalDate(), color, aviary);
	}

	private static AnimalRecord createAnimalRecord(Scanner scanner)
	{
		System.out.print("Nom : ");
		String name = scanner.nextLine();
		System.out.print("Poids (kg) : ");
		double weight = scanner.nextDouble();
		System.out.print("Taille (m) : ");
		double size = scanner.nextDouble();
		scanner.nextLine();
		System.out.print("Sexe : ");
		String sex = scanner.nextLine();
		System.out.print("Âge : ");
		int age = scanner.nextInt();
		System.out.print("Âge humain : ");
		int humanAge = scanner.nextInt();
		scanner.nextLine();
		System.out.print("Date d'arrivée (AAAA-MM-JJ) : ");
		LocalDate arrivalDate = LocalDate.parse(scanner.nextLine());
		return new AnimalRecord(name, weight, size, sex, age, humanAge, arrivalDate);
	}
}
