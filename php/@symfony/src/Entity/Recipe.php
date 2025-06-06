<?php

namespace App\Entity;

use App\Repository\RecipeRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[ORM\Table(name: "recipes")]
class Recipe
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\Column(length: 255)]
	#[Assert\NotBlank(message: "Le titre est obligatoire.")]
	#[Assert\Length(
		min: 10,
		max: 50,
		minMessage: "Le titre doit avoir plus de {{ limit }} caractères.",
		maxMessage: "Le titre doit avoir moins de {{ limit }} caractères."
	)]
	#[Assert\AtLeastOneOf(
		[
			new Assert\NotEqualTo("Merde", message: "Ce titre est trop vulgaire.")
		],
		message: ""
	)]
	//	#[Assert\NotEqualTo("Merde", message: "Ce titre est trop vulgaire.")]
	private ?string $title = null;

	#[ORM\Column(length: 255)]
	private ?string $slug = null;

	#[ORM\Column(type: Types::TEXT)]
	#[Assert\NotBlank(message: "Le contenu est obligatoire.")]
	#[Assert\Length(
		min: 20,
		minMessage: "Le titre doit avoir plus de {{ limit }} caractères.",
	)]
	private ?string $content = null;

	#[ORM\Column]
	private ?DateTimeImmutable $createdAt = null;

	#[ORM\Column]
	private ?DateTimeImmutable $updatedAt = null;

	#[ORM\Column(nullable: true)]
	#[Assert\Positive(
		message: "La durée doit être un nombre positif correspondant à des minutes de 1 et 1440."
	)]
	#[Assert\LessThan(
		1440,
		message: "La durée ne doit pas dépasser 24h en minutes, autrement dit {{ compared_value }} minutes."
	)]
	private ?int $duration = null;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getTitle(): ?string
	{
		return $this->title;
	}

	public function setTitle(string $title): static
	{
		$this->title = $title;

		return $this;
	}

	public function getSlug(): ?string
	{
		return $this->slug;
	}

	public function setSlug(string $slug): static
	{
		$this->slug = $slug;

		return $this;
	}

	public function getContent(): ?string
	{
		return $this->content;
	}

	public function setContent(string $content): static
	{
		$this->content = $content;

		return $this;
	}

	public function getCreatedAt(): ?DateTimeImmutable
	{
		return $this->createdAt;
	}

	public function setCreatedAt(DateTimeImmutable $createdAt): static
	{
		$this->createdAt = $createdAt;

		return $this;
	}

	public function getUpdatedAt(): ?DateTimeImmutable
	{
		return $this->updatedAt;
	}

	public function setUpdatedAt(DateTimeImmutable $updatedAt): static
	{
		$this->updatedAt = $updatedAt;

		return $this;
	}

	public function getDuration(): ?int
	{
		return $this->duration;
	}

	public function setDuration(?int $duration): static
	{
		$this->duration = $duration;

		return $this;
	}
}
