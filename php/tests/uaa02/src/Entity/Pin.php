<?php

namespace App\Entity;

use App\Entity\Trait\Timestampable;
use App\Repository\PinRepository;
use App\Validator\Badwords;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PinRepository::class)]
#[ORM\Table(name: '`pins`')]
#[ORM\HasLifecycleCallbacks]
class Pin
{
    /**
     * Id du Pin
     * @var int|null
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Titre du Pin
     * @var string|null
     */
    #[ORM\Column(length: 100)]
    #[Assert\Length(min: 3, max: 100)]
    #[Badwords(list: ["spam"])]
    private ?string $title = null;

    /**
     * Description du Pin
     * @var string|null
     */
    #[ORM\Column(nullable: true, type: Types::TEXT)]
    private ?string $description = null;

    /**
     * Image du pin
     * @var string|null
     */
    #[ORM\Column(length: 500)]
    private ?string $imageName = null;

    /**
     * Utilisateur ayant crée le Pin
     * @var User|null
     */
    #[ORM\ManyToOne(inversedBy: 'pins')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * Trait de création et mise à jour
     */
    use Timestampable;

    // --------------- //
    // Getter | Setter //
    // --------------- //

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(string $imageName): static
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
