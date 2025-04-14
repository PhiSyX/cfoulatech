<?php

namespace App\Model\Entity;

use DateTime;

class Stagiaire
{
	private int $id;
	private string $nom;
	private string $prenom;
	private string $email;
	private DateTime $dateNaissance;

	private Formation $formation;

	public function __construct(int $id)
	{
		$this->id = $id;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): static
	{
		$this->nom = $nom;
		return $this;
	}

	public function getPrenom(): string
	{
		return $this->prenom;
	}

	public function setPrenom(string $prenom): static
	{
		$this->prenom = $prenom;
		return $this;
	}

	public function getEmail(): string
	{
		return $this->email;
	}

	public function setEmail(string $email): static
	{
		$this->email = $email;
		return $this;
	}

	public function getDateNaissance(): DateTime
	{
		return $this->dateNaissance;
	}

	public function setDateNaissance(string $dateNaissance): static
	{
		$this->dateNaissance = new DateTime($dateNaissance);
		return $this;
	}

	public function getFormation(): Formation
	{
		return $this->formation;
	}

	public function setFormation(Formation $formation): static
	{
		$this->formation = $formation;
		return $this;
	}
}
