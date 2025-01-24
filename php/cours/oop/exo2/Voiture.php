<?php

class Voiture
{
	// --------- //
	// Propriété //
	// --------- //

	private string $couleur;
	private float $poids;
	private float $prix;
	private string $marque;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $marque,
		string $couleur,
		float $poids,
		float $prix,
	)
	{
		$this->marque = $marque;
		$this->couleur = $couleur;
		$this->poids = $poids;
		$this->prix = $prix;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function setCouleur(string $couleur): void
	{
		$this->couleur = $couleur;
	}

	public function setPoids(float $poids): void
	{
		$this->poids = $poids;
	}

	public function setPrix(float $prix): void
	{
		$this->prix = $prix;
	}

	public function getCouleur(): string
	{
		return $this->couleur;
	}

	public function getPrix(): float
	{
		return $this->prix;
	}

	public function getPoids(): float
	{
		return $this->poids;
	}

	public function getMarque(): string
	{
		return $this->marque;
	}

	public function setMarque(string $marque): void
	{
		$this->marque = $marque;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function accelerer(): void
	{
		echo "La voiture accélère<br>";
	}

	public function demarrer(): void
	{
		echo "La voiture démarre<br>";
	}

	public function addPrix(float $prix): void
	{
		$this->prix += $prix;;
	}

	public function plusChère(self $voiture): bool
	{
		return $this->prix > $voiture->getPrix();
	}
}
