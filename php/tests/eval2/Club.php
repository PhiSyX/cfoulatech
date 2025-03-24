<?php

class Club
{
	// --------- //
	// Propriété //
	// --------- //

	private int $idClub;
	private string $nomDuClub;
	private string $pays;
	private array $joueurs;
	public float $budget;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		int $idClub,
		string $nomDuClub,
		string $pays,
		float $budget,
	) {
		$this->idClub = $idClub;
		$this->nomDuClub = $nomDuClub;
		$this->pays = $pays;
		$this->budget = $budget;
		$this->joueurs = [];
	}

	// ----------- //
	// Méthode PHP //
	// ----------- //

	public function __toString(): string
	{
		$info = "Voici le club " . $this->getIdClub() . "\n";
		$info .= "Nom : " . $this->getNomDuClub() . "\n";
		$info .= "Pays : " . $this->getPays() . "\n";
		$info .= "Budget : " . $this->getBudget() . "\n";
		$info .= "Joueurs : \n";

		foreach ($this->joueurs as $index => $joueur) {
			$info .= "\t " . $index + 1 . ": " . $joueur->getName() . "\n";
		}

		$info .= "\n\n";

		return $info;
	}

	// ------- //
	// Méthode //
	// ------- //

	public function acheterJoueur(Footballeur $joueur): bool
	{
		$onALeBudget = $this->budget >= $joueur->getPrix();
		if ($onALeBudget) {
			// L'ancien club vend son joueur
			$ancienClub = $joueur->getClub();
			$ancienClub->vendreJoueur($joueur);

			// On soustrait le budget du club actuel par le prix du joueur
			$this->budget -= $joueur->getPrix();
			// On ajoute aux les joueurs du club le nouveau joueur
			$this->joueurs[] = $joueur;

			// On met à jour l'ancien club du joueur par le nouveau club
			$joueur->setClub($this);
		}
		return $onALeBudget;
	}

	public function vendreJoueur(Footballeur $joueur): bool
	{
		// Le joueur n'existe pas dans la liste des joueurs du club.
		if (!in_array($joueur, $this->joueurs)) {
			return false;
		}

		// On met à jour le budget
		$this->budget += $joueur->getPrix();

		// On met à jour la liste des joueurs
		$nouveauJoueurs = [];
		foreach ($this->joueurs as $j) {
			if ($j->getId() !== $joueur->getId()) {
				$nouveauJoueurs[] = $joueur;
			}
		}

		$this->joueurs = $nouveauJoueurs;

		return true;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getIdClub(): int
	{
		return $this->idClub;
	}

	public function getNomDuClub(): string
	{
		return $this->nomDuClub;
	}

	public function setNomDuClub(string $nomDuClub): void
	{
		$this->nomDuClub = $nomDuClub;
	}

	public function getPays(): string
	{
		return $this->pays;
	}

	public function setPays(string $pays): void
	{
		$this->pays = $pays;
	}

	public function getJoueurs(): array
	{
		return $this->joueurs;
	}

	public function setJoueurs(array $joueurs): void
	{
		$this->joueurs = $joueurs;
	}

	public function getBudget(): float
	{
		return $this->budget;
	}

	public function setBudget(float $budget): void
	{
		$this->budget = $budget;
	}
}
