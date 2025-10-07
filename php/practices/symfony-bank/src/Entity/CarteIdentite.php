<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Enum\Sexe;
use App\Repository\CarteIdentiteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table(name: '`cartes_identite`')]
#[ORM\Entity(repositoryClass: CarteIdentiteRepository::class)]
#[ApiResource]
class CarteIdentite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $date_naissance = null;

    #[ORM\Column(enumType: Sexe::class)]
    private ?Sexe $sexe = null;

    #[ORM\Column(length: 255)]
    private ?string $nationalite = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $registre_national = null;

    #[ORM\Column(length: 255)]
    private ?string $numero = null;

    #[ORM\Column(length: 255)]
    private ?string $type_titre = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $expire_le = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $delivre_le = null;

    #[ORM\Column(length: 255)]
    private ?string $delivre_endroit = null;

    #[ORM\OneToOne(
        mappedBy: 'carte_identite',
        cascade: ['persist', 'remove'],
    )]
    private ?User $proprietaire = null;

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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeImmutable
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(\DateTimeImmutable $date_naissance): static
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getSexe(): ?Sexe
    {
        return $this->sexe;
    }

    public function setSexe(Sexe $sexe): static
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getNationalite(): ?string
    {
        return $this->nationalite;
    }

    public function setNationalite(string $nationalite): static
    {
        $this->nationalite = $nationalite;

        return $this;
    }

    public function getRegistreNational(): ?string
    {
        return $this->registre_national;
    }

    public function setRegistreNational(string $registre_national): static
    {
        $this->registre_national = $registre_national;

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

    public function getTypeTitre(): ?string
    {
        return $this->type_titre;
    }

    public function setTypeTitre(string $type_titre): static
    {
        $this->type_titre = $type_titre;

        return $this;
    }

    public function getExpireLe(): ?\DateTimeImmutable
    {
        return $this->expire_le;
    }

    public function setExpireLe(\DateTimeImmutable $expire_le): static
    {
        $this->expire_le = $expire_le;

        return $this;
    }

    public function getDelivreLe(): ?\DateTimeImmutable
    {
        return $this->delivre_le;
    }

    public function setDelivreLe(\DateTimeImmutable $delivre_le): static
    {
        $this->delivre_le = $delivre_le;

        return $this;
    }

    public function getDelivreEndroit(): ?string
    {
        return $this->delivre_endroit;
    }

    public function setDelivreEndroit(string $delivre_endroit): static
    {
        $this->delivre_endroit = $delivre_endroit;

        return $this;
    }

    public function getProprietaire(): ?User
    {
        return $this->proprietaire;
    }

    public function setProprietaire(?User $proprietaire): static
    {
        // unset the owning side of the relation if necessary
        if ($proprietaire === null && $this->proprietaire !== null) {
            $this->proprietaire->setCarteIdentite(null);
        }

        // set the owning side of the relation if necessary
        if ($proprietaire !== null && $proprietaire->getCarteIdentite() !== $this) {
            $proprietaire->setCarteIdentite($this);
        }

        $this->proprietaire = $proprietaire;

        return $this;
    }
}
