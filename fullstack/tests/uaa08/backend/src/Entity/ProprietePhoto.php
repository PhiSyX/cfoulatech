<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ProprietePhotoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table('proprietes_photos')]
#[ORM\Entity(repositoryClass: ProprietePhotoRepository::class)]
#[ApiResource]
#[Get]
#[GetCollection]
#[Post(security: "is_granted('IS_AUTHENTICATED_FULLY')")]
#[Patch(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getPropriete().getProprietaire() == user")]
#[Put(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getPropriete().getProprietaire() == user")]
#[Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getPropriete().getProprietaire() == user")]
class ProprietePhoto
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $principale = false;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'], inversedBy: 'photos')]
    private ?Propriete $propriete = null;

    #[ORM\ManyToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Photo $photo = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isPrincipale(): ?bool
    {
        return $this->principale;
    }

    public function setPrincipale(?bool $principale): static
    {
        $this->principale = $principale;

        return $this;
    }

    public function getPropriete(): ?Propriete
    {
        return $this->propriete;
    }

    public function setPropriete(?Propriete $propriete): static
    {
        $this->propriete = $propriete;

        return $this;
    }

    public function getPhoto(): ?Photo
    {
        return $this->photo;
    }

    public function setPhoto(?Photo $photo): static
    {
        $this->photo = $photo;

        return $this;
    }
}
