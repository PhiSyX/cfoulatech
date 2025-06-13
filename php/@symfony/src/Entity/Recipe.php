<?php

namespace App\Entity;

use App\Entity\Trait\Timestampable;
use App\Repository\RecipeRepository;
use App\Validator\Badwords;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[ORM\Table(name: "recipes")]
#[UniqueEntity("title")]
class Recipe
{
	use Timestampable;

	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\Column(length: 255, unique: true)]
	#[Assert\NotBlank]
	#[Assert\Length(min: 10, max: 50)]
	#[Badwords(["Merde", "Prout"])]
	private ?string $title = null;

	#[ORM\Column(length: 255)]
	private ?string $slug = null;

	#[ORM\Column(type: Types::TEXT)]
	#[Assert\NotBlank]
	#[Assert\Length(min: 20)]
	private ?string $content = null;
	#[ORM\Column(nullable: true)]
	#[Assert\Positive]
	#[Assert\LessThan(1440)]
	private ?int $duration = null;

	#[ORM\Column(length: 500, nullable: true)]
	private ?string $imageName = null;

	#[ORM\ManyToOne(inversedBy: 'recipes')]
	#[ORM\JoinColumn(nullable: false)]
	private ?User $user = null;

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

	public function getDuration(): ?int
	{
		return $this->duration;
	}

	public function setDuration(?int $duration): static
	{
		$this->duration = $duration;

		return $this;
	}

	public function getImageName(): ?string
	{
		return $this->imageName;
	}

	public function setImageName(?string $imageName): static
	{
		$this->imageName = $imageName;

		return $this;
	}

	public function getUser(): ?User
	{
		return $this->user;
	}

	public function setUser(?User $user): static
	{
		$this->user = $user;

		return $this;
	}
}
