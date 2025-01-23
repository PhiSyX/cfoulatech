<?php

class PersonnageJeux
{
	private string $nom;
	private int $age;
	private float $poids;

	public function __construct(string $nom, int $age, float $poids)
	{
		$this->nom = $nom;
		$this->age = $age;
		$this->poids = $poids;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function setAge(int $age): void
	{
		$this->age = $age;
	}

	public function getPoids(): float
	{
		return $this->poids;
	}

	public function setPoids(float $poids): void
	{
		$this->poids = $poids;
	}

	public function avance(): string
	{
		return "Avance avec assurance";
	}
}
