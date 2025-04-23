<?php

namespace App\Entity;

use App\Repository\SportRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SportRepository::class)]
#[ORM\Table(name: "sports")]
class Sport
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\Column(length: 255)]
	private ?string $nom = null;

	#[ORM\Column(type: Types::TEXT)]
	private ?string $regles = null;

	#[ORM\Column]
	private ?int $tempsDeJeu = null;

	#[ORM\Column]
	private ?\DateTimeImmutable $createdAt = null;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getNom(): ?string
	{
		return $this->nom;
	}

	public function setNom(string $nom): static
	{
		$this->nom = $nom;

		return $this;
	}

	public function getRegles(): ?string
	{
		return $this->regles;
	}

	public function setRegles(string $regles): static
	{
		$this->regles = $regles;

		return $this;
	}

	public function getTempsDeJeu(): ?int
	{
		return $this->tempsDeJeu;
	}

	public function setTempsDeJeu(int $tempsDeJeu): static
	{
		$this->tempsDeJeu = $tempsDeJeu;

		return $this;
	}

	public function getCreatedAt(): ?\DateTimeImmutable
	{
		return $this->createdAt;
	}

	public function setCreatedAt(\DateTimeImmutable $createdAt): static
	{
		$this->createdAt = $createdAt;

		return $this;
	}
}
