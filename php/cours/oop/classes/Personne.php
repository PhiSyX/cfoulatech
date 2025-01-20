<?php

class Personne
{
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Le prénom de la personne.
	 */
	private string $prénom;
	/**
	 * L'âge de la personne.
	 */
	private int $age;
	/**
	 * Le sexe de la personne 'M' ou 'F' ou 'X'
	 */
	private string $sexe;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit la classe Personne
	 */
	public function __construct(string $prénom, int $age, string $sexe)
	{
		$this->prénom = $prénom;
		$this->age = $age;
		$this->sexe = $sexe;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //



	public function getPrénom(): string
	{
		return $this->prénom;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function getSexe(): string
	{
		return $this->sexe;
	}

	public function setPrénom(string $prénom): void
	{
		$this->prénom = $prénom;
	}

	public function setAge(int $age): void
	{
		$this->age = $age;
	}

	public function setSexe(string $sexe): void
	{
		$this->sexe = $sexe;
	}

	public function __toString(): string
	{
		return "Prénom: " . $this->prénom . "<br>"      .
			"Age: "    . $this->age    . " ans <br>" .
			"Sexe: "   . $this->sexe   . " <br>";
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	/**
	 * Vérifie que l'objet Personne en cours est plus âgée qu'un autre object Personne
	 */
	public function estPlusAgé(Personne $personne): bool
	{
		return $this->age > $personne->getAge();
	}
}
