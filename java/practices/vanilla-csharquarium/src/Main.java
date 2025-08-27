public class Main {
	public static void main(String[] args) {
		System.out.println("Aquarium de Monsieur Shingshan");

		Aquarium aquarium = new Aquarium();

		System.out.println("• Ajout de poissons");

		aquarium.ajouterPoisson("Poisson1", Sexe.MALE);
		aquarium.ajouterPoisson("Poisson2", Sexe.FEMELLE);
		aquarium.ajouterPoisson("Poisson3", Sexe.MALE);
		aquarium.ajouterPoisson("Poisson4", Sexe.MALE);
		aquarium.ajouterPoisson("Poisson5", Sexe.FEMELLE);

		System.out.println("• Ajout d'algues");

		for (int i = 0; i < 8; i++) {
			aquarium.ajouterAlgue();
		}

		aquarium.afficherEtat();

		System.out.println("• Temps:");
		System.out.println();

		for (int tour = 1; tour <= 5; tour++) {
			aquarium.passerLeTempsDUnTour();

			try {
				Thread.sleep(250);
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
				break;
			}
		}

		System.out.println();
	}
}
