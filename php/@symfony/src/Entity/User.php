<?php

namespace App\Entity;

use App\Entity\Trait\Timestampable;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table("users")]
#[ORM\UniqueConstraint(name: "UNIQ_IDENTIFIER_EMAIL", fields: ["email"])]
#[UniqueEntity(fields: ["email"], message: "registration.form.validation.email.unique")]
#[Vich\Uploadable]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
	use Timestampable;

	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\Column(length: 180)]
	#[Assert\Email]
	#[Assert\Length(min: 8)]
	#[Assert\NotBlank]
	private ?string $email = null;

	/**
	 * @var list<string> The user roles
	 */
	#[ORM\Column]
	private array $roles = [];

	/**
	 * @var string The hashed password
	 */
	#[ORM\Column]
	private ?string $password = null;

	#[ORM\Column(length: 255)]
	#[Assert\Length(min: 2, max: 35)]
	#[Assert\NotBlank]
	private ?string $firstname = null;

	#[ORM\Column(length: 255)]
	#[Assert\Length(min: 2, max: 70)]
	#[Assert\NotBlank]
	private ?string $lastname = null;

	#[Vich\UploadableField(mapping: 'profiles', fileNameProperty: 'imageName', size: 'imageSize')]
	private ?File $imageFile = null;

	#[ORM\Column(nullable: true)]
	private ?string $imageName = "default-avatar.png";

	#[ORM\Column(nullable: true)]
	private ?int $imageSize = null;

	/**
	 * @var Collection<int, Recipe>
	 */
	#[ORM\OneToMany(targetEntity: Recipe::class, mappedBy: "user", orphanRemoval: true)]
	private Collection $recipes;

	#[ORM\Column]
	private bool $isVerified = false;

	public function __construct()
	{
		$this->recipes = new ArrayCollection();
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getEmail(): ?string
	{
		return $this->email;
	}

	public function setEmail(string $email): static
	{
		$this->email = $email;
		return $this;
	}

	/**
	 * A visual identifier that represents this user.
	 *
	 * @see UserInterface
	 */
	public function getUserIdentifier(): string
	{
		return (string)$this->email;
	}

	/**
	 * @return list<string>
	 * @see UserInterface
	 *
	 */
	public function getRoles(): array
	{
		$roles = $this->roles;
		// guarantee every user at least has ROLE_USER
		$roles[] = "ROLE_USER";
		return array_unique($roles);
	}

	/**
	 * @param list<string> $roles
	 */
	public function setRoles(array $roles): static
	{
		$this->roles = $roles;
		return $this;
	}

	/**
	 * @see PasswordAuthenticatedUserInterface
	 */
	public function getPassword(): ?string
	{
		return $this->password;
	}

	public function setPassword(string $password): static
	{
		$this->password = $password;
		return $this;
	}

	/**
	 * @see UserInterface
	 */
	public function eraseCredentials(): void
	{
		// If you store any temporary, sensitive data on the user, clear it here
		// $this->plainPassword = null;
	}

	public function getFirstname(): ?string
	{
		return $this->firstname;
	}

	public function setFirstname(string $firstname): static
	{
		$this->firstname = $firstname;
		return $this;
	}

	public function getLastname(): ?string
	{
		return $this->lastname;
	}

	public function setLastname(string $lastname): static
	{
		$this->lastname = $lastname;
		return $this;
	}

	public function getFullname(): string
	{
		return $this->firstname . " " . $this->lastname;
	}

	/**
	 * @return Collection<int, Recipe>
	 */
	public function getRecipes(): Collection
	{
		return $this->recipes;
	}

	public function addRecipe(Recipe $recipe): static
	{
		if (!$this->recipes->contains($recipe)) {
			$this->recipes->add($recipe);
			$recipe->setUser($this);
		}

		return $this;
	}

	public function removeRecipe(Recipe $recipe): static
	{
		if ($this->recipes->removeElement($recipe)) {
			// set the owning side to null (unless already changed)
			if ($recipe->getUser() === $this) {
				$recipe->setUser(null);
			}
		}

		return $this;
	}

	public function isVerified(): bool
	{
		return $this->isVerified;
	}

	public function setIsVerified(bool $isVerified): static
	{
		$this->isVerified = $isVerified;

		return $this;
	}

	/**
	 * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
	 * of 'UploadedFile' is injected into this setter to trigger the update. If this
	 * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
	 * must be able to accept an instance of 'File' as the bundle will inject one here
	 * during Doctrine hydration.
	 *
	 * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
	 */
	public function setImageFile(?File $imageFile = null): void
	{
		$this->imageFile = $imageFile;

		if (null !== $imageFile) {
			// It is required that at least one field changes if you are using doctrine
			// otherwise the event listeners won't be called and the file is lost
			$this->updatedAt = new \DateTimeImmutable();
		}
	}

	public function getImageFile(): ?File
	{
		return $this->imageFile;
	}

	public function setImageName(?string $imageName): void
	{
		$this->imageName = $imageName;
	}

	public function getImageName(): ?string
	{
		return $this->imageName;
	}

	public function setImageSize(?int $imageSize): void
	{
		$this->imageSize = $imageSize;
	}

	public function getImageSize(): ?int
	{
		return $this->imageSize;
	}

	public function __serialize(): array
	{
		return [
			"id" => $this->id,
			"email" => $this->email,
			"password" => $this->password
		];
	}
}
