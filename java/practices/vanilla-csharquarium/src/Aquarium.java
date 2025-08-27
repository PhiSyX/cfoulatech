import java.util.ArrayList;
import java.util.List;

class Aquarium
{
	private final List<Poisson> poissons;
	private final List<Algue> algues;
	private int numeroTour;

	public Aquarium()
	{
		this.poissons = new ArrayList<>();
		this.algues = new ArrayList<>();
		this.numeroTour = 0;
	}

	/**
	 * Ajoute un poisson dans l'aquarium
	 *
	 * @param nom  le nom du poisson
	 * @param sexe le sexe du poisson
	 */
	public void ajouterPoisson(String nom, Sexe sexe)
	{
		if (nom.trim().isEmpty()) {
			throw new IllegalArgumentException("Le nom du poisson ne peut pas être vide");
		}

		poissons.add(new Poisson(nom, sexe));
		System.out.println("\t• Poisson ajouté: " + nom + " (" + sexe + ")");
	}

	/**
	 * Ajoute une algue dans l'aquarium
	 */
	public void ajouterAlgue()
	{
		algues.add(new Algue());
		System.out.println("\t• Algue ajoutée");
	}

	/**
	 * Fait passer le temps d'un tour et affiche le rapport
	 */
	public void passerLeTempsDUnTour()
	{
		numeroTour++;

		System.out.println();
		System.out.println("#".repeat(29));
		System.out.println("#\tRapport du tour n°" + numeroTour + " \t#");
		System.out.println("#".repeat(29));

		System.out.println("Nombre d'algues présentes: " + algues.size());
		System.out.println();

		System.out.println("Liste des poissons:");
		if (poissons.isEmpty()) {
			System.out.println("\tAucun poisson dans l'aquarium");
		} else {
			for (int i = 0; i < poissons.size(); i++) {
				System.out.println("\t" + (i + 1) + ". " + poissons.get(i));
			}
		}

		System.out.println("=".repeat(50));
	}

	/**
	 * Affiche l'état actuel de l'aquarium sans faire passer le temps
	 */
	public void afficherEtat()
	{
		System.out.println();
		System.out.println("#".repeat(34));
		System.out.println("# \tÉtat actuel de l'aquarium\t #");
		System.out.println("#".repeat(34));

		System.out.println("Tour actuel: " + numeroTour);
		System.out.println("Algues: " + algues.size());
		System.out.println("Poissons: " + poissons.size());
		System.out.println("-".repeat(40));
	}

	public int getNombreAlgues()
	{
		return algues.size();
	}

	public int getNombrePoissons()
	{
		return poissons.size();
	}

	public int getNumeroTour()
	{
		return numeroTour;
	}
}
