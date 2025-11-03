<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AdresseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table('adresses')]
#[ORM\Entity(repositoryClass: AdresseRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_ADDRESS', fields: ['rue', 'numero'])]
#[ApiResource]
#[Get]
#[Post(security: "is_granted('IS_AUTHENTICATED_FULLY')")]
#[Patch(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getPropriete().getProprietaire() == user")]
class Adresse
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $rue = null;

    #[ORM\Column(length: 10)]
    private ?string $numero = null;

    #[ORM\Column(length: 255)]
    private ?string $pays = null;

    #[ORM\Column(length: 255)]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    private ?string $geoloc_gps = "0,0";

    #[ORM\OneToOne(mappedBy: 'adresse', cascade: ['persist', 'remove'])]
    private ?Propriete $propriete = null;

    #[ORM\Column]
    private ?int $codePostal = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(string $rue): static
    {
        $this->rue = $rue;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): static
    {
        $this->pays = $pays;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getGeolocGps(): ?string
    {
        return $this->geoloc_gps;
    }

    public function setGeolocGps(string $geoloc_gps): static
    {
        $this->geoloc_gps = $geoloc_gps;

        return $this;
    }

    public function getPropriete(): ?Propriete
    {
        return $this->propriete;
    }

    public function setPropriete(Propriete $propriete): static
    {
        // set the owning side of the relation if necessary
        if ($propriete->getAdresse() !== $this) {
            $propriete->setAdresse($this);
        }

        $this->propriete = $propriete;

        return $this;
    }

    public function getCodePostal(): ?int
    {
        return $this->codePostal;
    }

    public function setCodePostal(int $codePostal): static
    {
        $this->codePostal = $codePostal;

        return $this;
    }
}
