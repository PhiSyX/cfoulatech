<?php

namespace App\Entity;

use App\Repository\ESportRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ESportRepository::class)]
#[ORM\Table(name: "esports")]
class ESport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nomDuJeu = null;

    #[ORM\Column(length: 255)]
    private ?string $typeDeJeu = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $regleDuJeu = null;

    #[ORM\Column]
    private ?int $nbJoueurEquipe = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeImmutable $dateDeSortie = null;

    #[ORM\Column]
    private ?bool $pourAdulte = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomDuJeu(): ?string
    {
        return $this->nomDuJeu;
    }

    public function setNomDuJeu(string $nomDuJeu): static
    {
        $this->nomDuJeu = $nomDuJeu;

        return $this;
    }

    public function getTypeDeJeu(): ?string
    {
        return $this->typeDeJeu;
    }

    public function setTypeDeJeu(string $typeDeJeu): static
    {
        $this->typeDeJeu = $typeDeJeu;

        return $this;
    }

    public function getRegleDuJeu(): ?string
    {
        return $this->regleDuJeu;
    }

    public function setRegleDuJeu(string $regleDuJeu): static
    {
        $this->regleDuJeu = $regleDuJeu;

        return $this;
    }

    public function getNbJoueurEquipe(): ?int
    {
        return $this->nbJoueurEquipe;
    }

    public function setNbJoueurEquipe(int $nbJoueurEquipe): static
    {
        $this->nbJoueurEquipe = $nbJoueurEquipe;

        return $this;
    }

    public function getDateDeSortie(): ?\DateTimeImmutable
    {
        return $this->dateDeSortie;
    }

    public function setDateDeSortie(\DateTimeImmutable $dateDeSortie): static
    {
        $this->dateDeSortie = $dateDeSortie;

        return $this;
    }

    public function isPourAdulte(): ?bool
    {
        return $this->pourAdulte;
    }

    public function setPourAdulte(bool $pourAdulte): static
    {
        $this->pourAdulte = $pourAdulte;

        return $this;
    }
}
