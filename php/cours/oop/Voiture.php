<?php

class Voiture
{
	/** Les états */

	/**
	 * Couleur de la voiture
	 */
	private string $couleur;
	/**
	 * Marque de la voiture
	 */
	private string $marque;
	/**
	 * Poids de la voiture
	 */
	private float $poids;
	/**
	 * Prix de la voiture
	 */
	private int $prix;

	/**
	 * Permet de construire la classe Voiture en un type `objet Voiture`
	 */
	public function __construct(string $uneCouleur, float $unPoids, int $unPrix)
	{
		$this->couleur = $uneCouleur;
		$this->poids = $unPoids;
		$this->prix = $unPrix;
		$this->marque = "";
	}

	/** Méthodes spéciales */

	public function __toString(): string
	{
		$str = "";

		$str .= "La couleur de la voiture est : <strong>" . $this->getCouleur() . "</strong>   <br>";
		$str .= "La poids   de la voiture est : <strong>" . $this->getPoids()   . "</strong>Kg <br>";
		$str .= "Le prix    de la voiture est : <strong>" . $this->getPrix()    . "</strong>€  <br>";

		if ($this->hasMarque()) {
			$str .= "La marque  de la voiture est : <strong>" . $this->getMarque()  . "</strong> <br>";
		}

		$str .= "<br>";

		return $str;
	}


	/** Les getters / setters */

	public function getCouleur(): string
	{
		return $this->couleur;
	}

	public function setCouleur(string $couleur): void
	{
		$this->couleur = $couleur;
	}

	public function getDifference(Voiture $other): float
	{
		return abs($this->prix - $other->getPrix());
	}

	public function getMarque(): string
	{
		return $this->marque;
	}

	public function setMarque(string $marque): void
	{
		$this->marque = $marque;
	}

	public function getPrix(): int
	{
		return $this->prix;
	}

	public function setPrix(int $prix): void
	{
		$this->prix = $prix;
	}

	public function getPoids(): float
	{
		return $this->poids;
	}

	public function setPoids(float $poids): void
	{
		$this->poids = $poids;
	}

	public function addPrix(int $prix): void
	{
		$this->prix += $prix;
	}

	public function hasMarque(): bool
	{
		return !empty($this->marque);
	}

	public function isMoreExpensive(Voiture $voiture)
	{
		return $this->prix > $voiture->getPrix();
	}

	/** Les comportements */

	/**
	 * Cette fonction démarre la voiture
	 */
	public function demarrer(): void
	{
		echo "La voiture {$this->couleur} a démarré";
	}

	/**
	 * Cette fonction accélère la voiture
	 */
	public function accelerer(): void
	{
		echo "La voiture {$this->couleur} accélère";
	}
}
