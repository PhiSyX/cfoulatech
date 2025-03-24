<?php

class Footballeur
{
	// --------- //
	// Propriété //
	// --------- //

	private int $id;
	private string $name;
	protected int $age;
	public string $nationalite;
	private Club $club;
	public float $prix;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		int $id,
		string $name,
		int $age,
		string $nationalite,
		Club $club,
		float $prix,
	) {
		$this->id = $id;
		$this->name = $name;
		$this->age = $age;
		$this->nationalite = $nationalite;
		$this->club = $club;
		$this->prix = $prix;

		$joueurs = $this->club->getJoueurs();
		$joueurs[] = $this;
		$this->club->setJoueurs($joueurs);
	}

	// ----------- //
	// Méthode PHP //
	// ----------- //

	public function __toString(): string
	{
		$info = "Voici le joueur " . $this->getId() . "\n";
		$info .= "Nom : " . $this->getName() . "\n";
		$info .= "Age : " . $this->getAge() . " ans\n";
		$info .= "Nationalité : " . $this->getNationalite() . "\n";
		$info .= "Prix : " . $this->getPrix() . "\n";
		$info .= "Club : " . $this->getClub()->getNomDuClub() . " en " . $this->getClub()->getPays() . "\n";
		$info .= "\n\n";
		return $info;
	}

	// ------- //
	// Méthode //
	// ------- //

	public function sEntrainer(): string
	{
		return $this->getName() . " s'entraine avec le club " . $this->getClub()->getNomDuClub() . ".\n";
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getId(): int
	{
		return $this->id;
	}

	public function getName(): string
	{
		return $this->name;
	}

	public function setName(string $name): void
	{
		$this->name = $name;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function setAge(int $age): void
	{
		$this->age = $age;
	}

	public function getNationalite(): string
	{
		return $this->nationalite;
	}

	public function setNationalite(string $nationalite): void
	{
		$this->nationalite = $nationalite;
	}

	public function getClub(): Club
	{
		return $this->club;
	}

	public function setClub(Club $club): void
	{
		$this->club = $club;
	}

	public function getPrix(): float
	{
		return $this->prix;
	}

	public function setPrix(float $prix): void
	{
		$this->prix = $prix;
	}
}
