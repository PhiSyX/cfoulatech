<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AnnonceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table('annonces')]
#[ORM\Entity(repositoryClass: AnnonceRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[Get]           // Lecture : /api/annonces/1
#[GetCollection] // Lecture : /api/annonces
#[Post(security: "is_granted('IS_AUTHENTICATED_FULLY')")] // Création : /api/annonces
#[Patch(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getUtilisateur() == user")] // Modification : /api/annonces/1
#[Delete(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROPRIETAIRE') and object.getUtilisateur() == user")] // Suppression : /api/annonces/1
// NOTE : Pour ordonner les enregistrements de manière ascendante ou descendante
//
// Accès via `/api/annonces?order[propriete]=asc|desc`
#[ApiFilter(OrderFilter::class, arguments: ['orderParameterName' => 'order'])]
// NOTE : Pour filtrer les enregistrements à partir des champs listés dans `properties`
//
// Accès via `/api/annonces?nom_propriete=UneValeur`
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'id' => 'exact',
        'type' => 'exact',
        'utilisateur' => 'exact',
        'propriete.type' => 'exact',
        'propriete.adresse.codePostal' => 'exact',
        'propriete.adresse.ville' => 'exact',
        'propriete.adresse.pays' => 'exact',
    ]
)]
// NOTE : Pour filtrer les enregistrements à partir des champs listés dans `properties`
//        avec l'idée d'avoir des champs de type `integer/double`
//
// Accès via `/api/annonces?nom_propriete=10..20`
#[ApiFilter(
    RangeFilter::class,
    properties: [
        'propriete.prix',
        'propriete.nombrePieces',
        'propriete.nombreChambres',
    ],
)]
class Annonce
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'annonces')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Propriete $propriete = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    public function getPropriete(): ?Propriete
    {
        return $this->propriete;
    }

    public function setPropriete(Propriete $propriete): static
    {
        $this->propriete = $propriete;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    #[ORM\PrePersist, ORM\PreUpdate]
    public function updateTimestamps(): void
    {
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt(new \DateTimeImmutable);
        }
    }
}
