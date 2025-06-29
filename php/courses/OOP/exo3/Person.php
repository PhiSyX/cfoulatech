<?php

class Person
{
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Le prénom de la personne.
	 */
	private string $firstname;
	/**
	 * L'âge de la personne.
	 */
	private int $age;
	/**
	 * Le genre de la personne 'M' ou 'F' ou 'X'
	 */
	private string $gender;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit la classe Person
	 */
	public function __construct(string $firstname, int $age, string $gender)
	{
		$this->firstname = $firstname;
		$this->age = $age;
		$this->gender = $gender;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getFirstname(): string
	{
		return $this->firstname;
	}

	public function setFirstname(string $firstname): void
	{
		$this->firstname = $firstname;
	}

	public function getGender(): string
	{
		return $this->gender;
	}

	public function setGender(string $gender): void
	{
		$this->gender = $gender;
	}

	public function __toString(): string
	{
		return "Prénom : " . $this->firstname . "     <br>" .
			"Age    : " . $this->age . " ans <br>" .
			"Genre  : " . $this->gender . "     <br>";
	}

	/**
	 * Vérifie que l'objet Person en cours est plus âgée qu'un autre object Person
	 */
	public function isOlderThan(Person $personne): bool
	{
		return $this->age > $personne->getAge();
	}

	// ------- //
	// Méthode // -> Native de PHP
	// ------- //

	public function getAge(): int
	{
		return $this->age;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function setAge(int $age): void
	{
		$this->age = $age;
	}
}
