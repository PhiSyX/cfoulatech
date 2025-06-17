<?php

class Vehicule
{
	protected string $nom;
	protected string $marque;
	protected string $pays;
	protected float $vitesseMax;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(string $nom, string $marque, float $vitesseMax)
	{
		$this->nom = $nom;
		$this->marque = $marque;
		$this->vitesseMax = $vitesseMax;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}

	public function getMarque(): string
	{
		return $this->marque;
	}

	public function setMarque(string $marque): void
	{
		$this->marque = $marque;
	}

	public function getPays(): string
	{
		return $this->pays;
	}

	public function setPays(string $pays): void
	{
		$this->pays = $pays;
	}

	public function getVitesseMax(): float
	{
		return $this->vitesseMax;
	}

	public function setVitesseMax(float $vitessemax): void
	{
		$this->vitesseMax = $vitessemax;
	}
}

class VehiculeDeuxRoues extends Vehicule
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $connecte;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $nom,
		string $marque,
		float $vitesseMax,
		string $pays,
		bool $connecte
	) {
		parent::__construct($nom, $marque, $vitesseMax);
		$this->setPays($pays);
		$this->connecte = $connecte;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getConnecte(): bool
	{
		return $this->connecte;
	}

	public function setConnecte(bool $connecte): void
	{
		$this->connecte = $connecte;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function faireWheeling(): void
	{
		echo "Le véhicule à deux roues " . $this->nom .
			 " de la marque ". $this->marque .
			 "fait un wheeling <br>";
	}
}

class VehiculeSansRoues extends Vehicule
{
	// --------- //
	// Propriété //
	// --------- //

	protected int $capacite;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $nom,
		string $marque,
		float $vitesseMax,
		int $capacite,
		string $pays = null
	) {
		parent::__construct($nom, $marque, $vitesseMax);
		$this->capacite = $capacite;
		if ($pays) {
			$this->setPays($pays);
		}
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getCapacite(): int
	{
		return $this->capacite;
	}

	public function setCapacite(int $capacite): void
	{
		$this->capacite = $capacite;
	}
}
