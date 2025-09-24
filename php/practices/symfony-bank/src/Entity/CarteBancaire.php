<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\Timestampable;
use App\Repository\CarteBancaireRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table('`cartes_bancaire`')]
#[ORM\Entity(repositoryClass: CarteBancaireRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class CarteBancaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'carteBancaires')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $proprietaire = null;

    #[ORM\Column(length: 255)]
    private ?string $numero = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $expire_le = null;

    #[ORM\Column(length: 255)]
    private ?string $bic = null;

    #[ORM\Column(length: 255)]
    private ?string $iban = null;

    use Timestampable;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProprietaire(): ?User
    {
        return $this->proprietaire;
    }

    public function setProprietaire(?User $proprietaire): static
    {
        $this->proprietaire = $proprietaire;

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

    public function getExpireLe(): ?\DateTimeImmutable
    {
        return $this->expire_le;
    }

    public function setExpireLe(\DateTimeImmutable $expire_le): static
    {
        $this->expire_le = $expire_le;

        return $this;
    }

    public function getBic(): ?string
    {
        return $this->bic;
    }

    public function setBic(string $bic): static
    {
        $this->bic = $bic;

        return $this;
    }

    public function getIban(): ?string
    {
        return $this->iban;
    }

    public function setIban(string $iban): static
    {
        $this->iban = $iban;

        return $this;
    }
}
