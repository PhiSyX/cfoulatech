<?php

class Employee
{
	private string $matricule;
	private string $nom;
	private string $prenom;
	private DateTimeInterface $dateNaissance;
	private DateTimeInterface $dateEmbauche;
	private float $salaire;
	private DateTimeInterface $now;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * On ne dépend pas directement de DateTime, mais plutôt de son interface.
	 * Comme ça, ça ne fait pas de dépendance directe avec la classe. La classe
	 * devient plus testable.
	 */
	public function __construct(
		string $matricule,
		string $nom,
		string $prenom,
		DateTimeInterface $dateNaissance,
		DateTimeInterface $dateEmbauche,
		float $salaire,
		DateTimeInterface $now = new DateTime("now"),
	) {
		$this->matricule = $matricule;
		$this->nom = $nom;
		$this->prenom = $prenom;
		$this->dateNaissance = $dateNaissance;
		$this->dateEmbauche = $dateEmbauche;
		$this->salaire = $salaire;
		$this->now = $now;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function setNow(DateTimeInterface $now): void
	{
		$this->now = $now;
	}

	public function getMatricule(): string
	{
		return $this->matricule;
	}

	public function setMatricule(string $matricule): void
	{
		$this->matricule = $matricule;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}

	public function getPrenom(): string
	{
		return $this->prenom;
	}

	public function setPrenom(string $prenom): void
	{
		$this->prenom = $prenom;
	}

	public function getDateNaissance(): DateTime
	{
		return $this->dateNaissance;
	}

	public function setDateNaissance(DateTimeInterface $dateNaissance): void
	{
		$this->dateNaissance = $dateNaissance;
	}

	public function getDateEmbauche(): DateTime
	{
		return $this->dateEmbauche;
	}

	public function setDateEmbauche(DateTimeInterface $dateEmbauche): void
	{
		$this->dateEmbauche = $dateEmbauche;
	}

	public function getSalaire(): float
	{
		return $this->salaire;
	}

	public function setSalaire(float $salaire): void
	{
		$this->salaire = $salaire;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function getAge(): int
	{
		return $this->dateNaissance->diff($this->now)->y;
	}

	public function getAnciennete(): int
	{
		return $this->dateEmbauche->diff($this->now)->y;
	}

	public function augmentationDuSalaire(float $salaire): void
	{
		$anciennete = $this->getAnciennete();

		$this->salaire += $salaire;

		if ($anciennete < 5) {
			$this->salaire *= 1 + 2 / 100;
		} else if ($anciennete < 10) {
			$this->salaire *= 1 + 5 / 100;
		} else {
			$this->salaire *= 1 + 10 / 100;
		}
	}

	public function afficherEmployé(): string
	{
		return "• Matricule : " . $this->matricule . " <br>" .
			   "• Nom complet : " . $this->nom . " " . $this->prenom . " <br>" .
			   "• Age : " . $this->getAge() . " ans <br>" .
			   "• Ancienneté : " . $this->getAnciennete() . " ans <br>" .
			   "• Salaire : " . $this->salaire . "€ <br><br>";
	}
}
