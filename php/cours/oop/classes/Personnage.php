<?php

class Personnage
{
	protected string $nom;
	protected int $age;
	protected float $poids;

	public function __construct(string $un, int $age, float $poids)
	{
		$this->nom = $un;
		$this->age = $age;
		$this->poids = $poids;
	}

	public function getPoids(): float
	{
		return $this->poids;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setPoids(float $poids): void
	{
		$this->poids = $poids;
	}

	public function setAge(int $age): void
	{
		$this->age = $age;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}
}
