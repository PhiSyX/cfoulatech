<?php

class Album implements JsonSerializable
{
	// --------- //
	// Propriété //
	// --------- //

	private string $nom;
	private int $nbPiste;
	private DateTime $dateDeSortie;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string   $nom,
		int      $nbPiste,
		DateTime $dateDeSortie,
	)
	{
		$this->nom = $nom;
		$this->nbPiste = $nbPiste;
		$this->dateDeSortie = $dateDeSortie;
	}


	// ------- //
	// Méthode // -> Native
	// ------- //

	public function jsonSerialize(): array
	{
		return [
			"nom" => $this->nom,
			"nbPiste" => $this->nbPiste,
			"dateDeSortie" => $this->dateDeSortie,
		];
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

	public function getNbPiste(): int
	{
		return $this->nbPiste;
	}

	public function setNbPiste(int $nbPiste): void
	{
		$this->nbPiste = $nbPiste;
	}

	public function getDateDeSortie(): DateTime
	{
		return $this->dateDeSortie;
	}

	public function setDateDeSortie(DateTime $dateDeSortie): void
	{
		$this->dateDeSortie = $dateDeSortie;
	}
}
