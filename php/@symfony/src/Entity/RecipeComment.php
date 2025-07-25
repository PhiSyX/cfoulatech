<?php

namespace App\Entity;

use App\Repository\RecipeCommentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: "recipes_comments")]
#[ORM\Entity(repositoryClass: RecipeCommentRepository::class)]
class RecipeComment
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\ManyToOne(inversedBy: 'comments')]
	#[ORM\JoinColumn(nullable: false)]
	private ?Recipe $recipe = null;

	#[ORM\ManyToOne]
	#[ORM\JoinColumn(nullable: false)]
	private ?User $author = null;

	#[ORM\Column(type: Types::TEXT)]
	#[Assert\NotBlank]
	#[Assert\Length(min: 20, max: 255)]
	private ?string $content = null;

	#[ORM\Column]
	private ?\DateTimeImmutable $created_at = null;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getAuthor(): ?User
	{
		return $this->author;
	}

	public function setAuthor(?User $author): static
	{
		$this->author = $author;

		return $this;
	}

	public function getRecipe(): ?Recipe
	{
		return $this->recipe;
	}

	public function setRecipe(?Recipe $recipe): static
	{
		$this->recipe = $recipe;

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

	public function getCreatedAt(): ?\DateTimeImmutable
	{
		return $this->created_at;
	}

	public function setCreatedAt(\DateTimeImmutable $created_at): static
	{
		$this->created_at = $created_at;

		return $this;
	}
}
