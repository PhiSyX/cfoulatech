<?php

namespace App\Model\Entity;

use DateTime;

class Formation implements \JsonSerializable
{
	private int $id;

	private string $intitule;
	private int $nbMois;
	private DateTime $dateDebut;

	private array $stagiaires = [];

	public function __construct(int $id)
	{
		$this->id = $id;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function getNbMois(): int
	{
		return $this->nbMois;
	}

	public function setNbMois(int $nbMois): static
	{
		$this->nbMois = $nbMois;
		return $this;
	}

	public function getDateDebut(): DateTime
	{
		return $this->dateDebut;
	}

	public function setDateDebut(string $dateDebut): static
	{
		$this->dateDebut = new DateTime($dateDebut);
		return $this;
	}

	public function getIntitule(): string
	{
		return $this->intitule;
	}

	public function setIntitule(string $intitule): static
	{
		$this->intitule = $intitule;
		return $this;
	}

	public function getStagiaires(): array
	{
		return $this->stagiaires;
	}

	public function setStagiaires(array $stagiaires): void
	{
		$this->stagiaires = $stagiaires;
	}

	public function jsonSerialize(): array
	{
		return [
			"id" => $this->id,
			"intitule" => $this->intitule,
			"nbMois" => $this->nbMois,
			"dateDebut" => $this->dateDebut,
			"stagiaires" => $this->stagiaires,
		];
	}
}
