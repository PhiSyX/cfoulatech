<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Trait\Timestampable;
use App\Repository\ProprieteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table('proprietes')]
#[ORM\Entity(repositoryClass: ProprieteRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[Get]
#[GetCollection]
#[Post(security: "is_granted('IS_AUTHENTICATED_FULLY')")]
#[Patch(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getProprietaire() == user")]
#[Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getProprietaire() == user")]
#[Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getProprietaire() == user")]
class Propriete
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column]
    private ?float $prix = null;

    #[ORM\Column]
    private ?float $surfaceM2 = null;

    #[ORM\Column]
    private ?int $nombrePieces = null;

    #[ORM\Column]
    private ?int $nombreChambres = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\OneToOne(inversedBy: 'propriete', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Adresse $adresse = null;

    #[ORM\ManyToOne(inversedBy: 'proprietes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $proprietaire = null;

    /**
     * @var Collection<int, ProprietePhoto>
     */
    #[ORM\OneToMany(targetEntity: ProprietePhoto::class, mappedBy: 'propriete', cascade: ['persist', 'remove'])]
    private Collection $photos;

    use Timestampable;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getSurfaceM2(): ?float
    {
        return $this->surfaceM2;
    }

    public function setSurfaceM2(float $surfaceM2): static
    {
        $this->surfaceM2 = $surfaceM2;

        return $this;
    }

    public function getNombrePieces(): ?int
    {
        return $this->nombrePieces;
    }

    public function setNombrePieces(int $nombrePieces): static
    {
        $this->nombrePieces = $nombrePieces;

        return $this;
    }

    public function getNombreChambres(): ?int
    {
        return $this->nombreChambres;
    }

    public function setNombreChambres(int $nombreChambres): static
    {
        $this->nombreChambres = $nombreChambres;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

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

    public function getAdresse(): ?Adresse
    {
        return $this->adresse;
    }

    public function setAdresse(Adresse $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getProprietaire(): ?Utilisateur
    {
        return $this->proprietaire;
    }

    public function setProprietaire(?Utilisateur $proprietaire): static
    {
        $this->proprietaire = $proprietaire;

        return $this;
    }

    /**
     * @return Collection<int, ProprietePhoto>
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }

    public function addPhoto(ProprietePhoto $photo): static
    {
        if (!$this->photos->contains($photo)) {
            $this->photos->add($photo);
            $photo->setPropriete($this);
        }

        return $this;
    }

    public function removePhoto(ProprietePhoto $photo): static
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getPropriete() === $this) {
                $photo->setPropriete(null);
            }
        }

        return $this;
    }
}
